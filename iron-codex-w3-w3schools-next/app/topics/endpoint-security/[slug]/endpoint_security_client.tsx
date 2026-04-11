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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14" | "control-15" | "control-16";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Endpoint Detection & Response", children: [
    { id: "control-1", label: "EDR Implementation" },
    { id: "control-2", label: "Behavioral Analysis" },
    { id: "control-3", label: "Threat Hunting" },
  ]},
  { label: "Malware Protection", children: [
    { id: "control-4", label: "Next-Generation Antivirus" },
    { id: "control-5", label: "Anti-Malware" },
    { id: "control-6", label: "Sandboxing" },
  ]},
  { label: "Device Security", children: [
    { id: "control-7", label: "Device Encryption" },
    { id: "control-8", label: "Secure Boot" },
    { id: "control-9", label: "Device Hardening" },
  ]},
  { label: "Patch Management", children: [
    { id: "control-10", label: "Automated Patching" },
    { id: "control-11", label: "Vulnerability Assessment" },
    { id: "control-12", label: "Patch Testing" },
  ]},
  { label: "Access Control", children: [
    { id: "control-13", label: "User Account Control" },
    { id: "control-14", label: "Application Control" },
    { id: "control-15", label: "USB and Removable Media C..." },
    { id: "control-16", label: "Network Access Control" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/endpoint-security/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "endpoint security edr antivirus device encryption patch management endpoint hardening and byod security for comprehensive endpoint protection",
  "control-1": "edr implementation deploy endpoint detection and response solutions for threat hunting and incident response",
  "control-2": "behavioral analysis monitor endpoint behavior for suspicious activities and anomalies",
  "control-3": "threat hunting proactively hunt for threats across endpoints",
  "control-4": "nextgeneration antivirus implement advanced antivirus with machine learning and heuristics",
  "control-5": "antimalware deploy comprehensive antimalware protection",
  "control-6": "sandboxing use sandboxing to analyze suspicious files and applications",
  "control-7": "device encryption enforce full disk encryption on all endpoint devices",
  "control-8": "secure boot implement secure boot processes to prevent rootkits",
  "control-9": "device hardening apply security configurations and disable unnecessary services",
  "control-10": "automated patching implement automated patch management for operating systems and applications",
  "control-11": "vulnerability assessment regular vulnerability scanning and assessment of endpoints",
  "control-12": "patch testing test patches in controlled environments before deployment",
  "control-13": "user account control implement proper user privilege management and uac",
  "control-14": "application control control which applications can execute on endpoints",
  "control-15": "usb and removable media control control and monitor removable media usage",
  "control-16": "network access control control endpoint network access based on compliance and security posture"
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
            <p>EDR, antivirus, device encryption, patch management, endpoint hardening, and BYOD security for comprehensive endpoint protection.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="EDR Implementation">
            <p dangerouslySetInnerHTML={{ __html: `Deploy endpoint detection and response solutions for threat hunting and incident response.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Behavioral Analysis">
            <p dangerouslySetInnerHTML={{ __html: `Monitor endpoint behavior for suspicious activities and anomalies.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Threat Hunting">
            <p dangerouslySetInnerHTML={{ __html: `Proactively hunt for threats across endpoints.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Next-Generation Antivirus">
            <p dangerouslySetInnerHTML={{ __html: `Implement advanced antivirus with machine learning and heuristics.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Anti-Malware">
            <p dangerouslySetInnerHTML={{ __html: `Deploy comprehensive anti-malware protection.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Sandboxing">
            <p dangerouslySetInnerHTML={{ __html: `Use sandboxing to analyze suspicious files and applications.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Device Encryption">
            <p dangerouslySetInnerHTML={{ __html: `Enforce full disk encryption on all endpoint devices.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Secure Boot">
            <p dangerouslySetInnerHTML={{ __html: `Implement secure boot processes to prevent rootkits.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Device Hardening">
            <p dangerouslySetInnerHTML={{ __html: `Apply security configurations and disable unnecessary services.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Automated Patching">
            <p dangerouslySetInnerHTML={{ __html: `Implement automated patch management for operating systems and applications.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Vulnerability Assessment">
            <p dangerouslySetInnerHTML={{ __html: `Regular vulnerability scanning and assessment of endpoints.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Patch Testing">
            <p dangerouslySetInnerHTML={{ __html: `Test patches in controlled environments before deployment.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="User Account Control">
            <p dangerouslySetInnerHTML={{ __html: `Implement proper user privilege management and UAC.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Application Control">
            <p dangerouslySetInnerHTML={{ __html: `Control which applications can execute on endpoints.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="USB and Removable Media Control">
            <p dangerouslySetInnerHTML={{ __html: `Control and monitor removable media usage.` }} />
          </Card>
        );
      case "control-16":
        return (
          <Card title="Network Access Control">
            <p dangerouslySetInnerHTML={{ __html: `Control endpoint network access based on compliance and security posture.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Endpoint Security</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Endpoint Security</div>
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
