import os
import re
import json

base_dir = os.getcwd()
content_dir = os.path.join(base_dir, 'content', 'topics')
app_dir = os.path.join(base_dir, 'app', 'topics')

html_files = [f for f in os.listdir(content_dir) if f.endswith('.html')]

skip_slugs = ['network-security', 'cloud-security', 'security-fundamentals', 'application-security', 'zero-trust', 'compliance-audit', 'identity-access-management', 'web-application-security']

html_escape_table = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    ">": "&gt;",
    "<": "&lt;",
}

def html_escape(text):
    return "".join(html_escape_table.get(c, c) for c in text)

for file in html_files:
    slug = file.replace('.html', '')
    if slug in skip_slugs:
        continue
        
    with open(os.path.join(content_dir, file), 'r', encoding='utf-8') as f:
        content = f.read()
        
    title_match = re.search(r'<h1>(.*?)</h1>', content)
    title = title_match.group(1) if title_match else slug
    
    intro_match = re.search(r'<p class="topic-intro">(.*?)</p>', content, re.DOTALL)
    intro_raw = intro_match.group(1) if intro_match else f"Overview of {title}"
    intro = re.sub(r'<[^>]+>', '', intro_raw)
    
    # find all control groups
    # A control group is bounded by <div class="control-group"> and either another control group or </section>
    group_pattern = r'<div class="control-group">(.*?)</div>(?=\s*<div class="control-group">|\s*</section>)'
    groups_raw = re.findall(group_pattern, content, re.DOTALL)
    
    groups = []
    slug_counter = 0
    all_slugs = ['intro']
    search_map = {}
    
    for g_raw in groups_raw:
        g_title_match = re.search(r'<h3>(.*?)</h3>', g_raw)
        g_title = g_title_match.group(1) if g_title_match else 'Group'
        
        item_pattern = r'<div class="control-item">(.*?)</div>(?=\s*<div class="control-item">|\s*$)'
        items_raw = re.findall(item_pattern, g_raw, re.DOTALL)
        
        group_items = []
        for i_raw in items_raw:
            i_title_match = re.search(r'<h4>(.*?)</h4>', i_raw)
            i_title = i_title_match.group(1) if i_title_match else 'Item'
            
            i_desc_match = re.search(r'<p>(.*?)</p>', i_raw, re.DOTALL)
            i_desc = i_desc_match.group(1) if i_desc_match else ''
            
            slug_counter += 1
            item_slug = f"control-{slug_counter}"
            all_slugs.append(item_slug)
            
            clean_search = re.sub(r'[^a-z0-9 ]', '', re.sub(r'<[^>]+>', '', f"{i_title} {i_desc}").lower())
            search_map[item_slug] = clean_search
            
            group_items.append({
                "title": i_title,
                "desc": i_desc,
                "slug": item_slug
            })
            
        groups.append({
            "title": g_title,
            "items": group_items
        })
        
    # Generate React code
    safe_title = title.replace('"', '\\"')
    safe_intro = intro.replace('"', '\\"')
    
    toc_str = '[\n  { id: "intro", label: "Introduction" },\n'
    for g in groups:
        toc_str += f'  {{ label: {json.dumps(g["title"])}, children: [\n'
        for i in g["items"]:
            short_title = i["title"][:25] + ("..." if len(i["title"]) > 25 else "")
            toc_str += f'    {{ id: "{i["slug"]}", label: {json.dumps(short_title)} }},\n'
        toc_str += '  ]},\n'
    toc_str += ']'
    
    items_cases = ""
    for g in groups:
        for i in g["items"]:
            safe_desc = html_escape(i["desc"])
            items_cases += f"""      case "{i['slug']}":
        return (
          <Card title={json.dumps(i['title'])}>
            <p dangerouslySetInnerHTML={{{{ __html: `{safe_desc}` }}}} />
          </Card>
        );\n"""

    all_slugs_joined = ", ".join([f'"{s}"' for s in all_slugs])
    search_map_entries = ",\n".join([f'  "{k}": {json.dumps(v)}' for k,v in search_map.items()])
    
    clean_intro_search = re.sub(r'[^a-z0-9 ]', '', f"{title} {intro}".lower())
    search_map_entries = f'  intro: {json.dumps(clean_intro_search)},\n' + search_map_entries

    slug_type = " | ".join([f'"{s}"' for s in all_slugs])
    
    react_code = f"""\"use client\";
import React, {{ useMemo, useState }} from "react";
import {{ PromoFlare }} from "@/components/PromoFlare";
import {{ useRouter }} from "next/navigation";

function Card({{ title, children }}: {{ title: string; children: React.ReactNode }}) {{
  return (
    <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-xl overflow-hidden mb-5">
      <div className="px-4 sm:px-5 py-3 border-b border-slate-700/60 font-semibold tracking-tight">
        {{title}}
      </div>
      <div className="p-4 sm:p-5 space-y-3">{{children}}</div>
    </section>
  );
}}

export type Slug = {slug_type};

type TocItem = {{ id: Slug; label: string }} | {{ label: string; children: {{ id: Slug; label: string }}[] }};

const TOC: TocItem[] = {toc_str};

const hrefFor = (s: Slug) => `/topics/{slug}/${{s}}`;

const ALL_SLUGS: Slug[] = [{all_slugs_joined}];

const SEARCH_TEXT: Record<Slug, string> = {{
{search_map_entries}
}};

function findFirstMatchingSlug(q: string): Slug | null {{
  const needle = q.trim().toLowerCase();
  if (!needle) return null;
  for (const s of ALL_SLUGS) {{
    if (SEARCH_TEXT[s].includes(needle)) return s;
  }}
  return null;
}}

export default function Client({{ slug }}: {{ slug: Slug }}) {{
  const router = useRouter();
  const [q, setQ] = useState("");

  const filteredToc = useMemo(() => {{
    const f = (label: string) => label.toLowerCase().includes(q.toLowerCase());
    return TOC
      .map((item) => {{
        if ("id" in item) return f(item.label) ? item : null;
        const kids = item.children.filter((c) => f(c.label));
        return kids.length ? {{ ...item, children: kids }} : f(item.label) ? item : null;
      }})
      .filter(Boolean) as TocItem[];
  }}, [q]);

  function runSearch() {{
    const s = findFirstMatchingSlug(q);
    if (s) router.push(hrefFor(s));
  }}

  function SectionBody() {{
    switch (slug) {{
      case "intro":
        return (
          <Card title="Introduction">
            <p>{safe_intro}</p>
          </Card>
        );
{items_cases}
    }}
  }}

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • {safe_title}</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search topics…"
            value={{q}}
            onChange={{(e) => setQ(e.target.value)}}
            onKeyDown={{(e) => {{ if (e.key === 'Enter') runSearch(); }}}}
            aria-label="Filter sidebar topics"
          />
          <button
            type="button"
            aria-label="Run search"
            title="Search"
            onClick={{runSearch}}
            className="shrink-0 grid place-items-center rounded-l-none rounded-r-lg bg-emerald-400 text-slate-900 w-10 h-auto">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className="p-2 text-sm">
          <h4 className="px-2 mt-2 mb-1 text-xs uppercase tracking-widest text-slate-400">Chapters</h4>
          <div className="space-y-2">
            {{filteredToc.map((item, idx) => (
              <div key={{idx}}>
                {{"id" in item ? (
                  <PromoFlare label={{item.label}} tone={{slug === item.id ? "active" : "default"}} eyebrow="Lesson" href={{hrefFor(item.id)}} size="sm" />
                ) : (
                  <details open className="rounded-xl border border-slate-800 bg-slate-900/40">
                    <summary className="cursor-pointer px-3 py-2 font-semibold">{{item.label}}</summary>
                    <div className="px-2 pb-2 space-y-1">
                      {{item.children.map((c) => (
                        <PromoFlare key={{c.id}} label={{c.label}} tone={{slug === c.id ? "active" : "default"}} size="sm" eyebrow="Lesson" href={{hrefFor(c.id)}} />
                      ))}}
                    </div>
                  </details>
                )}}
              </div>
            ))}}
          </div>
        </nav>
      </aside>

      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › {safe_title}</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {{TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}}
          </h2>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}}
"""

    safe_app_slug = re.sub(r'[^a-z0-9-]', '', slug)
    out_dir = os.path.join(app_dir, safe_app_slug, '[slug]')
    
    if os.path.exists(out_dir):
        tsx_path = os.path.join(out_dir, f"{safe_app_slug.replace('-', '_')}_client.tsx")
        with open(tsx_path, 'w', encoding='utf-8') as f:
            f.write(react_code)
            
        page_tsx_path = os.path.join(out_dir, 'page.tsx')
        with open(page_tsx_path, 'r', encoding='utf-8') as f:
            page_content = f.read()
            
        titles_map_dict = {"intro": "Introduction"}
        for g in groups:
            for i in g["items"]:
                titles_map_dict[i["slug"]] = i["title"]
                
        titles_map = "const titles: Record<string, string> = " + json.dumps(titles_map_dict, indent=2) + ";"
        
        page_content = re.sub(r'const titles: Record<string, string> = \{[^\}]+\};', titles_map, page_content)
        with open(page_tsx_path, 'w', encoding='utf-8') as f:
            f.write(page_content)
            
        print(f"Migrated {slug} ✅")
