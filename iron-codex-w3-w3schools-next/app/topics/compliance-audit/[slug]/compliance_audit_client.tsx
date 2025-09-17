'use client';
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

type Section = { id: string; label: string };
type Group = [string, Section[]];

const ContentBySlug: Record<string, any> = {
  intro: dynamic(() => import("@/content/topics/compliance-audit/intro.mdx")),
};

const TOC: Group[] = [
  ["Compliance Audit", [{ id: "intro", label: "Introduction" }]],
];

export default function Client({ slug }: { slug: string }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return TOC;
    const ql = q.toLowerCase();
    return TOC.map(([g, items]) => [g, items.filter(i => i.label.toLowerCase().includes(ql))] as Group);
  }, [q]);

  const Content = ContentBySlug[slug];

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <div className="size-2 rounded-full bg-emerald-400 shadow-[0_0_20px_2px_rgba(16,185,129,0.6)]" />
          <div className="text-sm text-slate-300">Iron-Codex • Compliance Audit</div>
        </div>
        <div className="p-4">
          <div className="relative mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search chapters…"
              className="w-full pl-9 pr-3 py-2 rounded bg-slate-800/70 outline-none text-slate-200 placeholder:text-slate-500 border border-slate-800/70 focus:border-emerald-500/50"
            />
            <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <nav className="space-y-3">
            {filtered.map(([group, items]) => (
              <div key={group} className="rounded-xl border border-slate-800/70 bg-slate-900/40">
                <div className="text-xs uppercase tracking-wide text-slate-400 px-3 pt-2">{group}</div>
                <div className="p-2 space-y-1">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/topics/compliance-audit/${item.id}`}
                      className={`block px-3 py-1.5 rounded-md border transition-colors ${slug === item.id ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-transparent hover:border-slate-700 text-slate-300 hover:text-slate-200"}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-sm text-slate-400 mb-2">Cybersecurity › Compliance Audit</div>
        <h2 className="text-3xl font-bold mb-4">{slug === "intro" ? "Introduction" : slug.replace(/-/g, " ")}</h2>
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow">
          {Content ? <Content /> : <div className="text-slate-400">Section not found.</div>}
        </section>
      </main>
    </div>
  );
}
