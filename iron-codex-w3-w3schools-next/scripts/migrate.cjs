const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'topics');
const appDir = path.join(process.cwd(), 'app', 'topics');
const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.html'));

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
  const skip = ['network-security', 'cloud-security', 'security-fundamentals', 'application-security', 'zero-trust', 'compliance-audit', 'identity-access-management', 'web-application-security'];
  if (skip.includes(slug)) continue;

  const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');

  const titleMatch = content.match(/<h1>(.*?)<\\/h1>/);
  const title = titleMatch ? titleMatch[1] : slug;

  const introMatch = content.match(/<p class="topic-intro">(.*?)<\\/p>/s);
  const intro = introMatch ? introMatch[1].replace(/<[^>]+>/g, '') : 'Overview of ' + title;

  const controlsMatch = extractAll(content, /<div class="control-group">([\\s\\S]*?)<\\/div>(?=\\s*<div class="control-group">|\\s*<\\/section>)/g);
  
  const groups = [];
  let slugCounter = 0;
  const allSlugs = ['intro'];
  const searchMap = {};
  
  for (const group of controlsMatch) {
    const groupHtml = group[1];
    const groupTitleStr = extractText(groupHtml, /<h3>(.*?)<\\/h3>/) || 'Group';
    
    const items = extractAll(groupHtml, /<div class="control-item">([\\s\\S]*?)<\\/div>(?=\\s*<div class="control-item">|\\s*$)/g);
    const groupItems = [];

    for (const item of items) {
      const itemTitle = extractText(item[1], /<h4>(.*?)<\\/h4>/);
      const itemDesc = extractText(item[1], /<p>(.*?)<\\/p>/) || '';
      
      const itemSlug = "control-" + (++slugCounter);
      allSlugs.push(itemSlug);
      
      searchMap[itemSlug] = (itemTitle + ' ' + itemDesc).replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, '');
      
      groupItems.push({ title: itemTitle, desc: itemDesc, slug: itemSlug });
    }

    groups.push({ title: groupTitleStr, items: groupItems });
  }

  const safeTitle = title.replace(/"/g, '\\"');
  const safeIntro = intro.replace(/"/g, '\\"');

  const tocStr = '[\\n  { id: "intro", label: "Introduction" },\\n' + groups.map(g => '  { label: ' + JSON.stringify(g.title) + ', children: [\\n' + g.items.map(i => '    { id: "' + i.slug + '", label: ' + JSON.stringify(i.title.substring(0,25)+(i.title.length>25?"...":"")) + ' },').join('\\n') + '\\n  ]},').join('\\n') + '\\n]';

  const itemsCases = groups.flatMap(g => g.items).map(i => '      case "' + i.slug + '":\\n        return (\\n          <Card title=' + JSON.stringify(i.title) + '>\\n            <p>' + i.desc.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;') + '<\\/p>\\n          <\\/Card>\\n        );').join('\\n');

  let reactCode = '"use client";\\n' +
'import React, { useMemo, useState } from "react";\\n' +
'import { PromoFlare } from "@/components/PromoFlare";\\n' +
'import { useRouter } from "next/navigation";\\n' +
'\\n' +
'function Card({ title, children }: { title: string; children: React.ReactNode }) {\\n' +
'  return (\\n' +
'    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-xl overflow-hidden mb-5">\\n' +
'      <div className="px-4 sm:px-5 py-3 border-b border-slate-700/60 font-semibold tracking-tight">\\n' +
'        {title}\\n' +
'      <\\/div>\\n' +
'      <div className="p-4 sm:p-5 space-y-3">{children}<\\/div>\\n' +
'    <\\/section>\\n' +
'  );\\n' +
'}\\n' +
'\\n' +
'export type Slug = "intro" | ' + (groups.flatMap(g => g.items).map(i => '"'+i.slug+'"').join(' | ') || '""') + ';\\n' +
'\\n' +
'type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };\\n' +
'\\n' +
'const TOC: TocItem[] = ' + tocStr + ';\\n' +
'\\n' +
'const hrefFor = (s: Slug) => "/topics/' + slug + '/" + s;\\n' +
'\\n' +
'const ALL_SLUGS: Slug[] = ["intro", ' + (groups.flatMap(g => g.items).map(i => '"'+i.slug+'"').join(', ')) + '];\\n' +
'\\n' +
'const SEARCH_TEXT: Record<Slug, string> = {\\n' +
'  intro: ' + JSON.stringify((title + ' ' + intro).toLowerCase().replace(/[^a-z0-9 ]/g, '')) + ',\\n' +
Object.entries(searchMap).map(([k,v]) => '  "'+k+'": ' + JSON.stringify(v) + ',').join('\\n') + '\\n' +
'};\\n' +
'\\n' +
'function findFirstMatchingSlug(q: string): Slug | null {\\n' +
'  const needle = q.trim().toLowerCase();\\n' +
'  if (!needle) return null;\\n' +
'  for (const s of ALL_SLUGS) {\\n' +
'    if (SEARCH_TEXT[s].includes(needle)) return s;\\n' +
'  }\\n' +
'  return null;\\n' +
'}\\n' +
'\\n' +
'export default function Client({ slug }: { slug: Slug }) {\\n' +
'  const router = useRouter();\\n' +
'  const [q, setQ] = useState("");\\n' +
'\\n' +
'  const filteredToc = useMemo(() => {\\n' +
'    const f = (label: string) => label.toLowerCase().includes(q.toLowerCase());\\n' +
'    return TOC\\n' +
'      .map((item) => {\\n' +
'        if ("id" in item) return f(item.label) ? item : null;\\n' +
'        const kids = item.children.filter((c) => f(c.label));\\n' +
'        return kids.length ? { ...item, children: kids } : f(item.label) ? item : null;\\n' +
'      })\\n' +
'      .filter(Boolean) as TocItem[];\\n' +
'  }, [q]);\\n' +
'\\n' +
'  function runSearch() {\\n' +
'    const s = findFirstMatchingSlug(q);\\n' +
'    if (s) router.push(hrefFor(s));\\n' +
'  }\\n' +
'\\n' +
'  function SectionBody() {\\n' +
'    switch (slug) {\\n' +
'      case "intro":\\n' +
'        return (\\n' +
'          <Card title="Introduction">\\n' +
'            <p>' + safeIntro + '<\\/p>\\n' +
'          <\\/Card>\\n' +
'        );\\n' +
itemsCases + '\\n' +
'    }\\n' +
'  }\\n' +
'\\n' +
'  return (\\n' +
'    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">\\n' +
'      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">\\n' +
'        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">\\n' +
'          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />\\n' +
'          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • ' + safeTitle + '<\\/h1>\\n' +
'        <\\/div>\\n' +
'        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">\\n' +
'          <input\\n' +
'            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"\\n' +
'            placeholder="Search topics…"\\n' +
'            value={q}\\n' +
'            onChange={(e) => setQ(e.target.value)}\\n' +
'            onKeyDown={(e) => { if (e.key === \\'Enter\\') runSearch(); }}\\n' +
'            aria-label="Filter sidebar topics"\\n' +
'          />\\n' +
'          <button\\n' +
'            type="button"\\n' +
'            aria-label="Run search"\\n' +
'            title="Search"\\n' +
'            onClick={runSearch}\\n' +
'            className="shrink-0 grid place-items-center rounded-l-none rounded-r-lg bg-emerald-400 text-slate-900 w-10 h-auto">\\n' +
'            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">\\n' +
'              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>\\n' +
'              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>\\n' +
'            <\\/svg>\\n' +
'          <\\/button>\\n' +
'        <\\/div>\\n' +
'        <nav className="p-2 text-sm">\\n' +
'          <h4 className="px-2 mt-2 mb-1 text-xs uppercase tracking-widest text-slate-400">Chapters<\\/h4>\\n' +
'          <div className="space-y-2">\\n' +
'            {filteredToc.map((item, idx) => (\\n' +
'              <div key={idx}>\\n' +
'                {"id" in item ? (\\n' +
'                  <PromoFlare label={item.label} tone={slug === item.id ? "active" : "default"} eyebrow="Lesson" href={hrefFor(item.id)} size="sm" />\\n' +
'                ) : (\\n' +
'                  <details open className="rounded-xl border border-slate-800 bg-slate-900/40">\\n' +
'                    <summary className="cursor-pointer px-3 py-2 font-semibold">{item.label}<\\/summary>\\n' +
'                    <div className="px-2 pb-2 space-y-1">\\n' +
'                      {item.children.map((c) => (\\n' +
'                        <PromoFlare key={c.id} label={c.label} tone={slug === c.id ? "active" : "default"} size="sm" eyebrow="Lesson" href={hrefFor(c.id)} />\\n' +
'                      ))}\\n' +
'                    <\\/div>\\n' +
'                  <\\/details>\\n' +
'                )}\\n' +
'              <\\/div>\\n' +
'            ))}\\n' +
'          <\\/div>\\n' +
'        <\\/nav>\\n' +
'      <\\/aside>\\n' +
'\\n' +
'      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">\\n' +
'        <div className="text-slate-400 text-sm mb-2">Cybersecurity › ' + safeTitle + '<\\/div>\\n' +
'        <div className="flex flex-wrap items-center gap-2 mb-4">\\n' +
'          <h2 className="text-3xl font-bold">\\n' +
'            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}\\n' +
'          <\\/h2>\\n' +
'        <\\/div>\\n' +
'        <SectionBody />\\n' +
'      <\\/main>\\n' +
'    <\\/div>\\n' +
'  );\\n' +
'}';

  const safeAppSlug = slug.replace(/[^a-z0-9-]/g, '');
  const outDir = path.join(appDir, safeAppSlug, '[slug]');
  
  if (fs.existsSync(outDir)) {
      const tsxPath = path.join(outDir, safeAppSlug.replace(/-/g, '_') + '_client.tsx');
      fs.writeFileSync(tsxPath, reactCode);
      
      const pageTsxPath = path.join(outDir, 'page.tsx');
      let pageContent = fs.readFileSync(pageTsxPath, 'utf-8');
      
      const titlesMapStr = JSON.stringify({
        intro: "Introduction",
        ...groups.flatMap(g => g.items).reduce((acc, i) => { acc[i.slug] = i.title; return acc; }, {})
      }, null, 2);

      const titlesMap = "const titles: Record<string, string> = " + titlesMapStr + ";";

      pageContent = pageContent.replace(/const titles: Record<string, string> = \{[^\}]+\};/, titlesMap);
      fs.writeFileSync(pageTsxPath, pageContent);
      console.log('Migrated ' + slug);
  }
}
