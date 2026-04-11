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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14" | "control-15" | "control-16" | "control-17";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Preparation", children: [
    { id: "control-1", label: "Incident Response Plan" },
    { id: "control-2", label: "Incident Response Team" },
    { id: "control-3", label: "Tools and Resources" },
  ]},
  { label: "Detection & Analysis", children: [
    { id: "control-4", label: "Security Information and ..." },
    { id: "control-5", label: "Intrusion Detection and P..." },
    { id: "control-6", label: "Log Analysis and Monitori..." },
    { id: "control-7", label: "Threat Hunting" },
  ]},
  { label: "Containment", children: [
    { id: "control-8", label: "Incident Containment Proc..." },
    { id: "control-9", label: "Network Isolation" },
    { id: "control-10", label: "Evidence Preservation" },
  ]},
  { label: "Eradication & Recovery", children: [
    { id: "control-11", label: "Threat Eradication" },
    { id: "control-12", label: "System Recovery" },
    { id: "control-13", label: "Vulnerability Remediation" },
  ]},
  { label: "Communication & Coordination", children: [
    { id: "control-14", label: "Internal Communication" },
    { id: "control-15", label: "External Communication" },
    { id: "control-16", label: "Law Enforcement Coordinat..." },
    { id: "control-17", label: "Post-Incident Analysis" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/incident-response/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16", "control-17"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "incident response siem log analysis forensics containment procedures and recovery planning for effective cybersecurity incident management and response",
  "control-1": "incident response plan develop comprehensive incident response procedures and playbooks",
  "control-2": "incident response team establish and train dedicated incident response team members",
  "control-3": "tools and resources deploy and maintain incident response tools and forensic capabilities",
  "control-4": "security information and event management siem implement siem for centralized log collection and correlation",
  "control-5": "intrusion detection and prevention deploy network and hostbased detection systems",
  "control-6": "log analysis and monitoring implement comprehensive logging and monitoring capabilities",
  "control-7": "threat hunting proactively search for indicators of compromise and threats",
  "control-8": "incident containment procedures implement rapid containment strategies to limit incident impact",
  "control-9": "network isolation quickly isolate affected systems and network segments",
  "control-10": "evidence preservation preserve digital evidence while containing the incident",
  "control-11": "threat eradication remove malware close attack vectors and eliminate threats",
  "control-12": "system recovery restore systems and services to normal operations",
  "control-13": "vulnerability remediation address vulnerabilities that allowed the incident to occur",
  "control-14": "internal communication coordinate with internal stakeholders and leadership",
  "control-15": "external communication manage communication with customers partners and regulators",
  "control-16": "law enforcement coordination coordinate with law enforcement and legal teams as appropriate",
  "control-17": "postincident analysis conduct lessons learned sessions and improve response procedures"
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
            <p>SIEM, log analysis, forensics, containment procedures, and recovery planning for effective cybersecurity incident management and response.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Incident Response Plan">
            <p dangerouslySetInnerHTML={{ __html: `Develop comprehensive incident response procedures and playbooks.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Incident Response Team">
            <p dangerouslySetInnerHTML={{ __html: `Establish and train dedicated incident response team members.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Tools and Resources">
            <p dangerouslySetInnerHTML={{ __html: `Deploy and maintain incident response tools and forensic capabilities.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Security Information and Event Management (SIEM)">
            <p dangerouslySetInnerHTML={{ __html: `Implement SIEM for centralized log collection and correlation.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Intrusion Detection and Prevention">
            <p dangerouslySetInnerHTML={{ __html: `Deploy network and host-based detection systems.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Log Analysis and Monitoring">
            <p dangerouslySetInnerHTML={{ __html: `Implement comprehensive logging and monitoring capabilities.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Threat Hunting">
            <p dangerouslySetInnerHTML={{ __html: `Proactively search for indicators of compromise and threats.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Incident Containment Procedures">
            <p dangerouslySetInnerHTML={{ __html: `Implement rapid containment strategies to limit incident impact.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Network Isolation">
            <p dangerouslySetInnerHTML={{ __html: `Quickly isolate affected systems and network segments.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Evidence Preservation">
            <p dangerouslySetInnerHTML={{ __html: `Preserve digital evidence while containing the incident.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Threat Eradication">
            <p dangerouslySetInnerHTML={{ __html: `Remove malware, close attack vectors, and eliminate threats.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="System Recovery">
            <p dangerouslySetInnerHTML={{ __html: `Restore systems and services to normal operations.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Vulnerability Remediation">
            <p dangerouslySetInnerHTML={{ __html: `Address vulnerabilities that allowed the incident to occur.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Internal Communication">
            <p dangerouslySetInnerHTML={{ __html: `Coordinate with internal stakeholders and leadership.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="External Communication">
            <p dangerouslySetInnerHTML={{ __html: `Manage communication with customers, partners, and regulators.` }} />
          </Card>
        );
      case "control-16":
        return (
          <Card title="Law Enforcement Coordination">
            <p dangerouslySetInnerHTML={{ __html: `Coordinate with law enforcement and legal teams as appropriate.` }} />
          </Card>
        );
      case "control-17":
        return (
          <Card title="Post-Incident Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Conduct lessons learned sessions and improve response procedures.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Incident Response</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Incident Response</div>
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
