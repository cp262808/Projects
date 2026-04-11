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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14" | "control-15" | "control-16" | "control-17" | "control-18" | "control-19";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Evidence Collection", children: [
    { id: "control-1", label: "Forensic Imaging and Acqu..." },
    { id: "control-2", label: "Volatile Memory Acquisiti..." },
    { id: "control-3", label: "Mobile Device Forensics" },
    { id: "control-4", label: "Cloud Forensics" },
    { id: "control-5", label: "Network Forensics" },
  ]},
  { label: "Chain of Custody", children: [
    { id: "control-6", label: "Evidence Documentation" },
    { id: "control-7", label: "Secure Evidence Storage" },
    { id: "control-8", label: "Evidence Tracking" },
  ]},
  { label: "Forensic Analysis", children: [
    { id: "control-9", label: "File System Analysis" },
    { id: "control-10", label: "Timeline Analysis" },
    { id: "control-11", label: "Registry Analysis" },
    { id: "control-12", label: "Log File Analysis" },
    { id: "control-13", label: "Malware Analysis" },
  ]},
  { label: "Specialized Forensics", children: [
    { id: "control-14", label: "Database Forensics" },
    { id: "control-15", label: "Email Forensics" },
    { id: "control-16", label: "Browser Forensics" },
  ]},
  { label: "Legal and Reporting", children: [
    { id: "control-17", label: "Expert Reporting" },
    { id: "control-18", label: "Expert Testimony" },
    { id: "control-19", label: "Legal Compliance" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/digital-forensics/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16", "control-17", "control-18", "control-19"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "digital forensics evidence collection chain of custody forensic analysis memory forensics and legal considerations for comprehensive digital investigation capabilities",
  "control-1": "forensic imaging and acquisition create bitbybit copies of digital media using forensically sound methods",
  "control-2": "volatile memory acquisition capture ram contents and running processes before shutdown",
  "control-3": "mobile device forensics extract data from smartphones tablets and other mobile devices",
  "control-4": "cloud forensics collect evidence from cloud services and virtualized environments",
  "control-5": "network forensics capture and analyze network traffic and communications",
  "control-6": "evidence documentation maintain detailed records of evidence handling and custody transfers",
  "control-7": "secure evidence storage store evidence in controlled environments with access controls",
  "control-8": "evidence tracking implement systems to track evidence location and access history",
  "control-9": "file system analysis examine file systems for deleted files metadata and artifacts",
  "control-10": "timeline analysis reconstruct chronological sequence of events from digital artifacts",
  "control-11": "registry analysis examine windows registry for system and user activity evidence",
  "control-12": "log file analysis analyze system and application logs for forensic evidence",
  "control-13": "malware analysis analyze malicious software found during investigations",
  "control-14": "database forensics examine database systems and transaction logs for evidence",
  "control-15": "email forensics analyze email systems and communications for investigation",
  "control-16": "browser forensics examine web browser artifacts including history and cache",
  "control-17": "expert reporting prepare detailed forensic reports for legal proceedings",
  "control-18": "expert testimony provide expert witness testimony in legal proceedings",
  "control-19": "legal compliance ensure adherence to legal requirements and standards"
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
            <p>Evidence collection, chain of custody, forensic analysis, memory forensics, and legal considerations for comprehensive digital investigation capabilities.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Forensic Imaging and Acquisition">
            <p dangerouslySetInnerHTML={{ __html: `Create bit-by-bit copies of digital media using forensically sound methods.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Volatile Memory Acquisition">
            <p dangerouslySetInnerHTML={{ __html: `Capture RAM contents and running processes before shutdown.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Mobile Device Forensics">
            <p dangerouslySetInnerHTML={{ __html: `Extract data from smartphones, tablets, and other mobile devices.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Cloud Forensics">
            <p dangerouslySetInnerHTML={{ __html: `Collect evidence from cloud services and virtualized environments.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Network Forensics">
            <p dangerouslySetInnerHTML={{ __html: `Capture and analyze network traffic and communications.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Evidence Documentation">
            <p dangerouslySetInnerHTML={{ __html: `Maintain detailed records of evidence handling and custody transfers.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Secure Evidence Storage">
            <p dangerouslySetInnerHTML={{ __html: `Store evidence in controlled environments with access controls.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Evidence Tracking">
            <p dangerouslySetInnerHTML={{ __html: `Implement systems to track evidence location and access history.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="File System Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Examine file systems for deleted files, metadata, and artifacts.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Timeline Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Reconstruct chronological sequence of events from digital artifacts.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Registry Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Examine Windows registry for system and user activity evidence.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Log File Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Analyze system and application logs for forensic evidence.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Malware Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Analyze malicious software found during investigations.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Database Forensics">
            <p dangerouslySetInnerHTML={{ __html: `Examine database systems and transaction logs for evidence.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="Email Forensics">
            <p dangerouslySetInnerHTML={{ __html: `Analyze email systems and communications for investigation.` }} />
          </Card>
        );
      case "control-16":
        return (
          <Card title="Browser Forensics">
            <p dangerouslySetInnerHTML={{ __html: `Examine web browser artifacts including history and cache.` }} />
          </Card>
        );
      case "control-17":
        return (
          <Card title="Expert Reporting">
            <p dangerouslySetInnerHTML={{ __html: `Prepare detailed forensic reports for legal proceedings.` }} />
          </Card>
        );
      case "control-18":
        return (
          <Card title="Expert Testimony">
            <p dangerouslySetInnerHTML={{ __html: `Provide expert witness testimony in legal proceedings.` }} />
          </Card>
        );
      case "control-19":
        return (
          <Card title="Legal Compliance">
            <p dangerouslySetInnerHTML={{ __html: `Ensure adherence to legal requirements and standards.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Digital Forensics</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Digital Forensics</div>
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
