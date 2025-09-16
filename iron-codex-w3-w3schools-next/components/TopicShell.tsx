'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";

export type TOCItem = { id: string; label: string };
export type TOCGroup = [string, TOCItem[]];

export default function TopicShell({
  kind,
  topic,
  title,
  slug,
  toc,
  brand = "Iron‑Codex",
  children,
}: {
  kind: "topics" | "guides";
  topic: string;
  title: string;
  slug: string;
  toc: TOCGroup[];
  brand?: string;
  children: React.ReactNode;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return toc;
    const ql = q.toLowerCase();
    return toc.map(
      ([g, items]) => [g, items.filter(i => i.label.toLowerCase().includes(ql))] as TOCGroup
    );
  }, [q, toc]);

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      {/* Sidebar — match IAM */}
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <div className="size-2 rounded-full bg-emerald-400 shadow-[0_0_20px_2px_rgba(16,185,129,0.6)]" />
          <div className="text-sm text-slate-300">{brand} • {title}</div>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search chapters…"
              className="flex-1 px-3 py-2 rounded-md bg-slate-800/70 outline-none text-slate-200 placeholder:text-slate-500 border border-slate-800/70 focus:border-emerald-500/50"
            />
          </div>

          <nav className="space-y-3">
            {filtered.map(([group, items]) => (
              <div key={group} className="rounded-xl border border-slate-800/70 bg-slate-900/40">
                <div className="text-xs uppercase tracking-wide text-slate-400 px-3 pt-2">{group}</div>
                <div className="p-2 space-y-1">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${kind}/${topic}/${item.id}`}
                      className={`block px-3 py-1.5 rounded-md border transition-colors ${
                        slug === item.id
                          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                          : "border-transparent hover:border-slate-700 text-slate-300 hover:text-slate-200"
                      }`}
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

      {/* Main — match IAM */}
      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-sm text-slate-400 mb-2">
          {kind === "topics" ? "Cybersecurity" : "Guides"} › {title}
        </div>
        <h2 className="text-3xl font-bold mb-4">{labelFor(slug)}</h2>

        {/* IAM-style card, no prose typography to match IAM visuals */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow">
          {children}
        </section>
      </main>
    </div>
  );
}

function labelFor(s: string) {
  if (s === "intro") return "Introduction";
  return s.replace(/-/g, " ");
}
