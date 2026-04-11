const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content', 'topics');
const appDir = path.join(__dirname, 'app', 'topics');

const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.html'));

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

function extractText(str, tagRegex) {
  const match = str.match(tagRegex);
  return match ? match[1].trim() : '';
}

function extractAll(str, tagRegex) {
  const matches = [];
  let match;
  while ((match = tagRegex.exec(str)) !== null) {
      matches.push(match);
  }
  return matches;
}

for (const file of htmlFiles) {
  const slug = file.replace('.html', '');
  // Skip ones we already migrated manually or are special
  const skip = ['network-security', 'cloud-security', 'security-fundamentals', 'application-security', 'zero-trust', 'compliance-audit', 'identity-access-management', 'web-application-security'];
  if (skip.includes(slug)) continue;

  const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');

  const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : slug;

  const introMatch = content.match(/<p class="topic-intro">(.*?)<\/p>/s);
  const intro = introMatch ? introMatch[1].replace(/<[^>]+>/g, '') : "Overview of " + title;

  const controlsMatch = extractAll(content, /<div class="control-group">([\s\S]*?)<\/div>(?=\s*<div class="control-group">|\s*<\/section>)/g);
  
  const groups = [];
  let slugCounter = 0;
  const allSlugs = ["intro"];
  const searchMap = {};
  
  const groupSlugs = [];

  for (const group of controlsMatch) {
    const groupHtml = group[1];
    const groupTitleStr = extractText(groupHtml, /<h3>(.*?)<\/h3>/) || "Group";
    
    const items = extractAll(groupHtml, /<div class="control-item">([\s\S]*?)<\/div>(?=\s*<div class="control-item">|\s*$)/g);
    
    const groupItems = [];

    for (const item of items) {
      const itemTitle = extractText(item[1], /<h4>(.*?)<\/h4>/);
      const itemDesc = extractText(item[1], /<p>(.*?)<\/p>/);
      
      const itemSlug = "control-" + (++slugCounter);
      allSlugs.push(itemSlug);
      
      searchMap[itemSlug] = (itemTitle + " " + itemDesc).replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, '');
      
      groupItems.push({
        title: itemTitle,
        desc: itemDesc,
        slug: itemSlug
      });
    }

    groups.push({
      title: groupTitleStr,
      items: groupItems
    });
  }

  // Create component content
  const componentName = slug.replace(/-./g, x=>x[1].toUpperCase()) + "Client";
  const safeTitle = title.replace(/"/g, '\\"');
  const safeIntro = intro.replace(/"/g, '\\"');

  const tocStr = `[
  { id: "intro", label: "Introduction" },
` + groups.map(g => `  { label: ${JSON.stringify(g.title)}, children: [\n` + g.items.map(i => `    { id: "${i.slug}", label: ${JSON.stringify(i.title.substring(0,25)+(i.title.length>25?"...":""))} },`).join("\n") + `\n  ]},`).join("\n") + `
]`;

  const itemsCases = groups.flatMap(g => g.items).map(i => `
      case "${i.slug}":
        return (
          <Card title=${JSON.stringify(i.title)}>
            <p>${i.desc.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</p>
          </Card>
        );`).join("\n");


  const reactCode = `"use client";
import React, { useMemo, useState } from "react";
import { PromoFlare } from "@/components/PromoFlare";
import { useRouter } from "next/navigation";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-xl overflow-hidden mb-5">
      <div className="px-4 sm:px-5 py-3 border-b border-slate-700/60 font-semibold tracking-tight">
        {title}
      </div>
      <div className="p-4 sm:p-5 space-y-3">{children}</div>
    </section>
  );
}

export type Slug = "intro" | ${groups.flatMap(g => g.items).map(i => `"${i.slug}"`).join(" | ") || '""'};

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = ${tocStr};

const hrefFor = (slug: Slug) => \`/topics/${slug}/\${slug}\`;

const ALL_SLUGS: Slug[] = ["intro", ${groups.flatMap(g => g.items).map(i => `"${i.slug}"`).join(", ")}];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: ${JSON.stringify((title + " " + intro).toLowerCase().replace(/[^a-z0-9 ]/g, ''))},
${Object.entries(searchMap).map(([k,v]) => `  "${k}": ${JSON.stringify(v)},`).join("\n")}
};

function findFirstMatchingSlug(q: string): Slug | null {
  const needle = q.trim().toLowerCase();
  if (!needle) return null;
  for (const s of ALL_SLUGS) {
    if (SEARCH_TEXT[s].includes(needle)) return s;
  }
  return null;
}

export default function Client({ slug }: { slug: Slug }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const filteredToc = useMemo(() => {
    const f = (label: string) => label.toLowerCase().includes(q.toLowerCase());
    return TOC
      .map((item) => {
        if ("id" in item) return f(item.label) ? item : null;
        const kids = item.children.filter((c) => f(c.label));
        return kids.length ? { ...item, children: kids } : f(item.label) ? item : null;
      })
      .filter(Boolean) as TocItem[];
  }, [q]);

  function runSearch() {
    const s = findFirstMatchingSlug(q);
    if (s) router.push(hrefFor(s));
  }

  function SectionBody() {
    switch (slug) {
      case "intro":
        return (
          <Card title="Introduction">
            <p>${safeIntro}</p>
          </Card>
        );
${itemsCases}
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • ${title}</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search topics…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') runSearch(); }}
            aria-label="Filter sidebar topics"
          />
          <button
            type="button"
            aria-label="Run search"
            title="Search"
            onClick={runSearch}
            className="shrink-0 grid place-items-center rounded-l-none rounded-r-lg bg-emerald-400 text-slate-900 w-10 h-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className="p-2 text-sm">
          <h4 className="px-2 mt-2 mb-1 text-xs uppercase tracking-widest text-slate-400">Chapters</h4>
          <div className="space-y-2">
            {filteredToc.map((item, idx) => (
              <div key={idx}>
                {"id" in item ? (
                  <PromoFlare label={item.label} tone={slug === item.id ? "active" : "default"} eyebrow="Lesson" href={hrefFor(item.id)} size="sm" />
                ) : (
                  <details open className="rounded-xl border border-slate-800 bg-slate-900/40">
                    <summary className="cursor-pointer px-3 py-2 font-semibold">{item.label}</summary>
                    <div className="px-2 pb-2 space-y-1">
                      {item.children.map((c) => (
                        <PromoFlare key={c.id} label={c.label} tone={slug === c.id ? "active" : "default"} size="sm" eyebrow="Lesson" href={hrefFor(c.id)} />
                      ))}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>

      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › ${title}</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}
          </h2>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}
`;

  // Write files
  const safeAppSlug = slug.replace(/[^a-z0-9-]/g, '');
  const outDir = path.join(appDir, safeAppSlug, '[slug]');
  
  if (fs.existsSync(outDir)) {
      const tsxPath = path.join(outDir, \`\${safeAppSlug.replace(/-/g, '_')}_client.tsx\`);
      fs.writeFileSync(tsxPath, reactCode);
      
      const pageTsxPath = path.join(outDir, 'page.tsx');
      let pageContent = fs.readFileSync(pageTsxPath, 'utf-8');
      
      const titlesMap = \`const titles: Record<string, string> = {
  intro: "Introduction",
\${groups.flatMap(g => g.items).map(i => \`  "\${i.slug}": \${JSON.stringify(i.title)},\`).join('\\n')}
};\`;

      pageContent = pageContent.replace(/const titles: Record<string, string> = \{[^\}]+\};/, titlesMap);
      fs.writeFileSync(pageTsxPath, pageContent);
      console.log('Migrated', slug);
  }
}
