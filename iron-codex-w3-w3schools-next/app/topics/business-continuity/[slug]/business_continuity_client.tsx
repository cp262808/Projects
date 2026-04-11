"use client";
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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Planning & Assessment", children: [
    { id: "control-1", label: "Business Impact Analysis ..." },
    { id: "control-2", label: "Risk Assessment and Analy..." },
    { id: "control-3", label: "Business Continuity Strat..." },
  ]},
  { label: "Disaster Recovery", children: [
    { id: "control-4", label: "Disaster Recovery Plannin..." },
    { id: "control-5", label: "Backup and Recovery Syste..." },
    { id: "control-6", label: "Alternative Site Manageme..." },
  ]},
  { label: "Crisis Management", children: [
    { id: "control-7", label: "Crisis Management Team" },
    { id: "control-8", label: "Emergency Communication" },
    { id: "control-9", label: "Stakeholder Management" },
  ]},
  { label: "Testing & Maintenance", children: [
    { id: "control-10", label: "Plan Testing and Exercise..." },
    { id: "control-11", label: "Plan Maintenance and Upda..." },
    { id: "control-12", label: "Training and Awareness" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/business-continuity/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "business continuity disaster recovery backup strategies rtorpo planning resilience engineering and crisis management for maintaining business operations during disruptions",
  "control-1": "business impact analysis bia identify critical business functions and assess potential impact of disruptions",
  "control-2": "risk assessment and analysis assess threats and vulnerabilities that could disrupt business operations",
  "control-3": "business continuity strategy develop comprehensive strategy for maintaining business operations",
  "control-4": "disaster recovery planning create detailed plans for it system and infrastructure recovery",
  "control-5": "backup and recovery systems implement robust backup and recovery capabilities for critical data and systems",
  "control-6": "alternative site management establish and maintain alternative sites for business operations",
  "control-7": "crisis management team establish trained crisis management team with clear roles and responsibilities",
  "control-8": "emergency communication implement communication systems for emergency response and stakeholder updates",
  "control-9": "stakeholder management manage communications with customers suppliers employees and other stakeholders",
  "control-10": "plan testing and exercises regularly test business continuity and disaster recovery plans",
  "control-11": "plan maintenance and updates keep business continuity plans current and aligned with business changes",
  "control-12": "training and awareness train employees on business continuity procedures and their roles"
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
            <p>Disaster recovery, backup strategies, RTO/RPO planning, resilience engineering, and crisis management for maintaining business operations during disruptions.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Business Impact Analysis (BIA)">
            <p dangerouslySetInnerHTML={{ __html: `Identify critical business functions and assess potential impact of disruptions.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Risk Assessment and Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Assess threats and vulnerabilities that could disrupt business operations.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Business Continuity Strategy">
            <p dangerouslySetInnerHTML={{ __html: `Develop comprehensive strategy for maintaining business operations.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Disaster Recovery Planning">
            <p dangerouslySetInnerHTML={{ __html: `Create detailed plans for IT system and infrastructure recovery.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Backup and Recovery Systems">
            <p dangerouslySetInnerHTML={{ __html: `Implement robust backup and recovery capabilities for critical data and systems.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Alternative Site Management">
            <p dangerouslySetInnerHTML={{ __html: `Establish and maintain alternative sites for business operations.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Crisis Management Team">
            <p dangerouslySetInnerHTML={{ __html: `Establish trained crisis management team with clear roles and responsibilities.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Emergency Communication">
            <p dangerouslySetInnerHTML={{ __html: `Implement communication systems for emergency response and stakeholder updates.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Stakeholder Management">
            <p dangerouslySetInnerHTML={{ __html: `Manage communications with customers, suppliers, employees, and other stakeholders.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Plan Testing and Exercises">
            <p dangerouslySetInnerHTML={{ __html: `Regularly test business continuity and disaster recovery plans.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Plan Maintenance and Updates">
            <p dangerouslySetInnerHTML={{ __html: `Keep business continuity plans current and aligned with business changes.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Training and Awareness">
            <p dangerouslySetInnerHTML={{ __html: `Train employees on business continuity procedures and their roles.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Business Continuity</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Business Continuity</div>
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
