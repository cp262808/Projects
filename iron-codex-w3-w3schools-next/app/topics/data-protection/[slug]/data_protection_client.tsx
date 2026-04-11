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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14" | "control-15" | "control-16" | "control-17" | "control-18";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Data Classification", children: [
    { id: "control-1", label: "Data Classification Frame..." },
    { id: "control-2", label: "Data Labeling" },
    { id: "control-3", label: "PII Identification" },
  ]},
  { label: "Data Loss Prevention", children: [
    { id: "control-4", label: "DLP Implementation" },
    { id: "control-5", label: "Content Inspection" },
    { id: "control-6", label: "Exfiltration Prevention" },
  ]},
  { label: "Privacy Compliance", children: [
    { id: "control-7", label: "GDPR Compliance" },
    { id: "control-8", label: "CCPA Compliance" },
    { id: "control-9", label: "Privacy Impact Assessment..." },
    { id: "control-10", label: "Data Subject Rights" },
  ]},
  { label: "Data Governance", children: [
    { id: "control-11", label: "Data Inventory" },
    { id: "control-12", label: "Data Lineage" },
    { id: "control-13", label: "Retention Policies" },
  ]},
  { label: "Data Security", children: [
    { id: "control-14", label: "Encryption at Rest" },
    { id: "control-15", label: "Encryption in Transit" },
    { id: "control-16", label: "Key Management" },
    { id: "control-17", label: "Access Controls" },
    { id: "control-18", label: "Backup Security" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/data-protection/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16", "control-17", "control-18"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "data protection data classification dlp privacy regulations gdpr ccpa data governance and backup security for comprehensive data protection programs",
  "control-1": "data classification framework establish systematic data classification based on sensitivity and business value",
  "control-2": "data labeling implement automated and manual data labeling mechanisms",
  "control-3": "pii identification identify and catalog personally identifiable information across systems",
  "control-4": "dlp implementation deploy data loss prevention solutions across endpoints network and cloud",
  "control-5": "content inspection implement deep content inspection for sensitive data patterns",
  "control-6": "exfiltration prevention prevent unauthorized data transmission and removal",
  "control-7": "gdpr compliance implement general data protection regulation requirements",
  "control-8": "ccpa compliance meet california consumer privacy act obligations",
  "control-9": "privacy impact assessments conduct privacy impact assessments for data processing activities",
  "control-10": "data subject rights implement processes for data subject access correction and deletion requests",
  "control-11": "data inventory maintain comprehensive inventory of data assets and flows",
  "control-12": "data lineage track data movement and transformations across systems",
  "control-13": "retention policies implement and enforce data retention and disposal policies",
  "control-14": "encryption at rest encrypt sensitive data stored in databases and file systems",
  "control-15": "encryption in transit protect data during transmission with strong encryption protocols",
  "control-16": "key management implement secure cryptographic key lifecycle management",
  "control-17": "access controls enforce rolebased access controls for sensitive data",
  "control-18": "backup security secure backup data with encryption and access controls"
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
            <p>Data classification, DLP, privacy regulations (GDPR, CCPA), data governance, and backup security for comprehensive data protection programs.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Data Classification Framework">
            <p dangerouslySetInnerHTML={{ __html: `Establish systematic data classification based on sensitivity and business value.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Data Labeling">
            <p dangerouslySetInnerHTML={{ __html: `Implement automated and manual data labeling mechanisms.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="PII Identification">
            <p dangerouslySetInnerHTML={{ __html: `Identify and catalog personally identifiable information across systems.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="DLP Implementation">
            <p dangerouslySetInnerHTML={{ __html: `Deploy data loss prevention solutions across endpoints, network, and cloud.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Content Inspection">
            <p dangerouslySetInnerHTML={{ __html: `Implement deep content inspection for sensitive data patterns.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Exfiltration Prevention">
            <p dangerouslySetInnerHTML={{ __html: `Prevent unauthorized data transmission and removal.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="GDPR Compliance">
            <p dangerouslySetInnerHTML={{ __html: `Implement General Data Protection Regulation requirements.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="CCPA Compliance">
            <p dangerouslySetInnerHTML={{ __html: `Meet California Consumer Privacy Act obligations.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Privacy Impact Assessments">
            <p dangerouslySetInnerHTML={{ __html: `Conduct privacy impact assessments for data processing activities.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Data Subject Rights">
            <p dangerouslySetInnerHTML={{ __html: `Implement processes for data subject access, correction, and deletion requests.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Data Inventory">
            <p dangerouslySetInnerHTML={{ __html: `Maintain comprehensive inventory of data assets and flows.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Data Lineage">
            <p dangerouslySetInnerHTML={{ __html: `Track data movement and transformations across systems.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Retention Policies">
            <p dangerouslySetInnerHTML={{ __html: `Implement and enforce data retention and disposal policies.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Encryption at Rest">
            <p dangerouslySetInnerHTML={{ __html: `Encrypt sensitive data stored in databases and file systems.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="Encryption in Transit">
            <p dangerouslySetInnerHTML={{ __html: `Protect data during transmission with strong encryption protocols.` }} />
          </Card>
        );
      case "control-16":
        return (
          <Card title="Key Management">
            <p dangerouslySetInnerHTML={{ __html: `Implement secure cryptographic key lifecycle management.` }} />
          </Card>
        );
      case "control-17":
        return (
          <Card title="Access Controls">
            <p dangerouslySetInnerHTML={{ __html: `Enforce role-based access controls for sensitive data.` }} />
          </Card>
        );
      case "control-18":
        return (
          <Card title="Backup Security">
            <p dangerouslySetInnerHTML={{ __html: `Secure backup data with encryption and access controls.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Data Protection</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Data Protection</div>
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
