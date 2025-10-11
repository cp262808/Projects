// Build nav.json from /content/topics/*/*.mdx
import { readdirSync, writeFileSync } from "fs";
import { join } from "path";
const ROOT = process.cwd();
const topicsDir = join(ROOT, "content", "topics");
const outPath = join(ROOT, "data", "nav.json");
function title(s){ return s.replace(/[-_]+/g," ").replace(/\b\w/g, m=>m.toUpperCase()); }
const topics = readdirSync(topicsDir, { withFileTypes: true }).filter(d=>d.isDirectory()).map(d=>d.name);
const items = topics.map(topic => {
  const files = readdirSync(join(topicsDir, topic)).filter(n=>n.endsWith(".mdx"));
  const nonIntro = files.filter(n=>n.toLowerCase()!=="intro.mdx");
  const first = (nonIntro[0] ?? files[0] ?? "intro.mdx").replace(/\.mdx$/,"");
  return { label: title(topic), href: `/topics/${topic}/${first}` };
});
writeFileSync(outPath, JSON.stringify({ items }, null, 2));
console.log("nav.json updated:", outPath);
