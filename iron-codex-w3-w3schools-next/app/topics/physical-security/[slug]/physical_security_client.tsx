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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Facility Access Control", children: [
    { id: "control-1", label: "Implement Multi-Factor Ac..." },
    { id: "control-2", label: "Security Guards and Recep..." },
    { id: "control-3", label: "Perimeter Security" },
  ]},
  { label: "Surveillance & Monitoring", children: [
    { id: "control-4", label: "CCTV Surveillance System" },
    { id: "control-5", label: "Intrusion Detection Syste..." },
    { id: "control-6", label: "Security Lighting" },
  ]},
  { label: "Environmental Controls", children: [
    { id: "control-7", label: "Fire Detection and Suppre..." },
    { id: "control-8", label: "Climate Control" },
    { id: "control-9", label: "Power Protection" },
  ]},
  { label: "Asset Protection", children: [
    { id: "control-10", label: "Equipment Security" },
    { id: "control-11", label: "Clean Desk Policy" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/physical-security/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "physical security access controls surveillance systems environmental controls facility security and asset protection for comprehensive physical security management",
  "control-1": "implement multifactor access control deploy badge readers pins and biometric systems for facility entry",
  "control-2": "security guards and reception deploy trained security personnel for access control and monitoring",
  "control-3": "perimeter security implement fencing barriers and perimeter detection systems",
  "control-4": "cctv surveillance system install comprehensive video surveillance with recording and monitoring capabilities",
  "control-5": "intrusion detection systems deploy motion sensors doorwindow alarms and breakglass detectors",
  "control-6": "security lighting implement adequate lighting for all areas including motionactivated systems",
  "control-7": "fire detection and suppression install fire detection systems and appropriate suppression mechanisms",
  "control-8": "climate control maintain appropriate temperature and humidity levels for equipment protection",
  "control-9": "power protection implement ups systems backup generators and power monitoring",
  "control-10": "equipment security secure computing equipment with locks cables and enclosures",
  "control-11": "clean desk policy enforce policies for securing sensitive materials when not in use"
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
            <p>Access controls, surveillance systems, environmental controls, facility security, and asset protection for comprehensive physical security management.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Implement Multi-Factor Access Control">
            <p dangerouslySetInnerHTML={{ __html: `Deploy badge readers, PINs, and biometric systems for facility entry.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Security Guards and Reception">
            <p dangerouslySetInnerHTML={{ __html: `Deploy trained security personnel for access control and monitoring.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Perimeter Security">
            <p dangerouslySetInnerHTML={{ __html: `Implement fencing, barriers, and perimeter detection systems.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="CCTV Surveillance System">
            <p dangerouslySetInnerHTML={{ __html: `Install comprehensive video surveillance with recording and monitoring capabilities.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Intrusion Detection Systems">
            <p dangerouslySetInnerHTML={{ __html: `Deploy motion sensors, door/window alarms, and break-glass detectors.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Security Lighting">
            <p dangerouslySetInnerHTML={{ __html: `Implement adequate lighting for all areas including motion-activated systems.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Fire Detection and Suppression">
            <p dangerouslySetInnerHTML={{ __html: `Install fire detection systems and appropriate suppression mechanisms.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Climate Control">
            <p dangerouslySetInnerHTML={{ __html: `Maintain appropriate temperature and humidity levels for equipment protection.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Power Protection">
            <p dangerouslySetInnerHTML={{ __html: `Implement UPS systems, backup generators, and power monitoring.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Equipment Security">
            <p dangerouslySetInnerHTML={{ __html: `Secure computing equipment with locks, cables, and enclosures.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Clean Desk Policy">
            <p dangerouslySetInnerHTML={{ __html: `Enforce policies for securing sensitive materials when not in use.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Physical Security</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Physical Security</div>
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
