  // Runs in Vercel during build (postinstall or build script)
  import fs from "fs";
  import path from "path";

  const root = process.cwd();
  const TOP_DIRS = ["app/topics", "app/guides"];

  const read = (p) => fs.readFileSync(p, "utf8");
  const write = (p, s) => { fs.mkdirSync(path.dirname(p), {recursive:true}); fs.writeFileSync(p, s); };
  const exists = (p) => fs.existsSync(p);

  function findSlugDirs(){
    const out = [];
    for (const base of TOP_DIRS){
      const dir = path.join(root, base);
      if (!exists(dir)) continue;
      for (const topic of fs.readdirSync(dir)){
        const sd = path.join(dir, topic, "[slug]");
        if (exists(sd) && fs.statSync(sd).isDirectory()){
          out.push({ base, topic, dir: sd });
        }
      }
    }
    return out;
  }

  function extractUnionSlugs(src){
    const m = src.match(/type\s+Slug\s*=\s*([\s\S]*?);/);
    if (!m) return null;
    const union = m[1];
    const items = Array.from(union.matchAll(/["\']([a-z0-9\-]+)["\']/g)).map(m=>m[1]);
    return items.length ? items : null;
  }

  function extractTitlesMap(pageSrc){
    const m = pageSrc.match(/(const\s+(TITLES|titles)\s*:\s*Record<[^>]+>\s*=\s*\{([\s\S]*?)\};)/);
    if (!m) return {};
    const body = m[3];
    const map = {};
    for (const mm of body.matchAll(/["\']([a-z0-9\-]+)["\']\s*:\s*["\']([^"\']+)["\']/g)){
      map[mm[1]] = mm[2];
    }
    return map;
  }

  function detectClientFile(slugDir){
    const entries = fs.readdirSync(slugDir).filter(f=>f.endsWith(".tsx"));
    const client = entries.find(f=>f.toLowerCase()!=="page.tsx");
    return client || null;
  }

  function titleCase(s){ return s.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase()); }

  function makeDataJson(topicKey, slugs, titles){
    const arr = (slugs && slugs.length ? slugs : ["intro"]).map(id => ({
      id,
      title: titles[id] || (id==="intro" ? "Introduction" : titleCase(id)),
      keywords: ""
    }));
    return JSON.stringify({ slugs: arr }, null, 2);
  }

  function pageTemplate(topicKey, clientImport){
    const TopicName = titleCase(topicKey);
    return `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Client from "./${clientImport.replace(/\.tsx$/,"")}";
import { loadTopic } from "@/lib/loadTopic";

type Props = { params: { slug: string } };
const TOPIC_KEY = "${topicKey}";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = loadTopic(TOPIC_KEY);
  const entry = data.slugs.find(s => s.id === params.slug);
  const name = entry?.title ?? params.slug.replace(/-/g, " ");
  return {
    title: \`\${name} · ${TopicName}\`,
    description: \`${TopicName} — \${name} section\`,
  };
}

export default function Page({ params }: Props) {
  const data = loadTopic(TOPIC_KEY);
  const ok = data.slugs.some(s => s.id === params.slug);
  if (!ok) notFound();
  return <Client slug={params.slug as any} />;
}

export function generateStaticParams() {
  const data = loadTopic(TOPIC_KEY);
  return data.slugs.map(({ id }) => ({ slug: id }));
}
`;
  }

  function refactor(){
    const slugDirs = findSlugDirs();
    if (!slugDirs.length){
      console.log("No [slug] directories found.");
      return;
    }
    // ensure deps files exist
    const schemaPath = path.join(root, "schemas", "topic.ts");
    if (!exists(schemaPath)){
      write(schemaPath, 'import { z } from "zod";\nexport const TopicSchema = z.object({ slugs: z.array(z.object({ id: z.string(), title: z.string(), keywords: z.string().optional() })) });\nexport type TopicData = z.infer<typeof TopicSchema>;\n');
    }
    const loaderPath = path.join(root, "lib", "loadTopic.ts");
    if (!exists(loaderPath)){
      write(loaderPath, 'import fs from "fs";\nimport path from "path";\nimport { TopicSchema, type TopicData } from "@/schemas/topic";\nexport function loadTopic(topic){ const file = path.join(process.cwd(), "data", `${topic}.json`); const raw = fs.readFileSync(file, "utf-8"); return TopicSchema.parse(JSON.parse(raw)); }\n');
    }
    const dataDir = path.join(root, "data");
    fs.mkdirSync(dataDir, {recursive:true});

    for (const { base, topic, dir } of slugDirs){
      const client = detectClientFile(dir);
      if (!client) continue;
      const clientSrc = read(path.join(dir, client));
      const pagePath = path.join(dir, "page.tsx");
      const pageSrc = exists(pagePath) ? read(pagePath) : "";
      const slugs = extractUnionSlugs(clientSrc) || null;
      const titles = extractTitlesMap(pageSrc);
      const dataJson = makeDataJson(topic, slugs, titles);
      write(path.join(dataDir, `${topic}.json`), dataJson);
      write(pagePath, pageTemplate(topic, client));
      console.log("Refactored", base, topic);
    }

    // Build nav.json
    const nav = [];
    for (const base of TOP_DIRS){
      const baseDir = path.join(root, base);
      if (!exists(baseDir)) continue;
      for (const t of fs.readdirSync(baseDir)){
        const sd = path.join(baseDir, t, "[slug]");
        if (!exists(sd)) continue;
        const isTopic = base.endsWith("topics");
        nav.push({ label: (t.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())), href: isTopic ? `/topics/${t}/intro` : `/guides/${t}` });
      }
    }
    write(path.join(root, "data", "nav.json"), JSON.stringify({ items: nav }, null, 2));
  }

  refactor();
