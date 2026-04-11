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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Threat Intelligence Collection", children: [
    { id: "control-1", label: "Intelligence Sources" },
    { id: "control-2", label: "IOC Management" },
    { id: "control-3", label: "TTP Analysis" },
    { id: "control-4", label: "MITRE ATT&CK Framework" },
  ]},
  { label: "Threat Hunting", children: [
    { id: "control-5", label: "Proactive Hunting" },
    { id: "control-6", label: "Hypothesis-Driven Hunting" },
    { id: "control-7", label: "Behavioral Analysis" },
  ]},
  { label: "Intelligence Analysis", children: [
    { id: "control-8", label: "Threat Attribution" },
    { id: "control-9", label: "Campaign Tracking" },
    { id: "control-10", label: "Risk Assessment" },
  ]},
  { label: "Intelligence Sharing", children: [
    { id: "control-11", label: "Information Sharing" },
    { id: "control-12", label: "STIX/TAXII Implementation" },
    { id: "control-13", label: "Industry Collaboration" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/threat-intelligence/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "threat intelligence threat hunting iocs ttps mitre attck threat modeling and intelligence sharing platforms for proactive threat detection and analysis",
  "control-1": "intelligence sources establish multiple threat intelligence feeds and sources",
  "control-2": "ioc management collect and manage indicators of compromise effectively",
  "control-3": "ttp analysis analyze tactics techniques and procedures of threat actors",
  "control-4": "mitre attck framework use mitre attck for threat modeling and detection",
  "control-5": "proactive hunting actively search for threats within the environment",
  "control-6": "hypothesisdriven hunting develop and test threat hypotheses systematically",
  "control-7": "behavioral analysis analyze user and system behavior for anomalies",
  "control-8": "threat attribution identify and attribute threats to specific threat actors",
  "control-9": "campaign tracking track and monitor threat campaign activities",
  "control-10": "risk assessment assess threat risk levels and potential impact",
  "control-11": "information sharing share threat intelligence with relevant stakeholders",
  "control-12": "stixtaxii implementation use structured threat information exchange standards",
  "control-13": "industry collaboration participate in industry threat sharing initiatives"
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
            <p>Threat hunting, IOCs, TTPs, MITRE ATT&CK, threat modeling, and intelligence sharing platforms for proactive threat detection and analysis.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Intelligence Sources">
            <p dangerouslySetInnerHTML={{ __html: `Establish multiple threat intelligence feeds and sources.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="IOC Management">
            <p dangerouslySetInnerHTML={{ __html: `Collect and manage indicators of compromise effectively.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="TTP Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Analyze tactics, techniques, and procedures of threat actors.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="MITRE ATT&CK Framework">
            <p dangerouslySetInnerHTML={{ __html: `Use MITRE ATT&amp;CK for threat modeling and detection.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Proactive Hunting">
            <p dangerouslySetInnerHTML={{ __html: `Actively search for threats within the environment.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Hypothesis-Driven Hunting">
            <p dangerouslySetInnerHTML={{ __html: `Develop and test threat hypotheses systematically.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Behavioral Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Analyze user and system behavior for anomalies.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Threat Attribution">
            <p dangerouslySetInnerHTML={{ __html: `Identify and attribute threats to specific threat actors.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Campaign Tracking">
            <p dangerouslySetInnerHTML={{ __html: `Track and monitor threat campaign activities.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Risk Assessment">
            <p dangerouslySetInnerHTML={{ __html: `Assess threat risk levels and potential impact.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Information Sharing">
            <p dangerouslySetInnerHTML={{ __html: `Share threat intelligence with relevant stakeholders.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="STIX/TAXII Implementation">
            <p dangerouslySetInnerHTML={{ __html: `Use structured threat information exchange standards.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Industry Collaboration">
            <p dangerouslySetInnerHTML={{ __html: `Participate in industry threat sharing initiatives.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Threat Intelligence</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Threat Intelligence</div>
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
