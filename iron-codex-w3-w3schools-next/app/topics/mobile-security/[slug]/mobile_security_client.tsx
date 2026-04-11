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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Device Management", children: [
    { id: "control-1", label: "Mobile Device Management ..." },
    { id: "control-2", label: "Device Encryption" },
    { id: "control-3", label: "Remote Wipe Capabilities" },
    { id: "control-4", label: "Jailbreak/Root Detection" },
  ]},
  { label: "Application Security", children: [
    { id: "control-5", label: "App Store Controls" },
    { id: "control-6", label: "Mobile App Security Testi..." },
    { id: "control-7", label: "Runtime Application Prote..." },
    { id: "control-8", label: "Code Obfuscation" },
  ]},
  { label: "Network & Communication", children: [
    { id: "control-9", label: "VPN Configuration" },
    { id: "control-10", label: "Certificate Pinning" },
    { id: "control-11", label: "Public Wi-Fi Protection" },
  ]},
  { label: "BYOD & Policies", children: [
    { id: "control-12", label: "BYOD Policy Implementatio..." },
    { id: "control-13", label: "Containerization" },
    { id: "control-14", label: "Mobile Threat Defense" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/mobile-security/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "mobile security mobile device management app security byod policies mobile threat defense and secure development for mobile platforms",
  "control-1": "mobile device management mdm implement centralized management of mobile devices and policies",
  "control-2": "device encryption enforce full device encryption for data protection",
  "control-3": "remote wipe capabilities enable remote device wiping for lost or stolen devices",
  "control-4": "jailbreakroot detection detect and restrict compromised devices",
  "control-5": "app store controls restrict app installations to approved stores and applications",
  "control-6": "mobile app security testing conduct security testing of mobile applications",
  "control-7": "runtime application protection implement runtime protection for mobile applications",
  "control-8": "code obfuscation protect mobile app code from reverse engineering",
  "control-9": "vpn configuration implement secure vpn access for mobile devices",
  "control-10": "certificate pinning pin ssl certificates to prevent maninthemiddle attacks",
  "control-11": "public wifi protection protect against public wifi security risks",
  "control-12": "byod policy implementation establish comprehensive bringyourowndevice policies",
  "control-13": "containerization separate corporate and personal data on devices",
  "control-14": "mobile threat defense deploy mobile threat detection and response solutions"
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
            <p>Mobile device management, app security, BYOD policies, mobile threat defense, and secure development for mobile platforms.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Mobile Device Management (MDM)">
            <p dangerouslySetInnerHTML={{ __html: `Implement centralized management of mobile devices and policies.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Device Encryption">
            <p dangerouslySetInnerHTML={{ __html: `Enforce full device encryption for data protection.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Remote Wipe Capabilities">
            <p dangerouslySetInnerHTML={{ __html: `Enable remote device wiping for lost or stolen devices.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Jailbreak/Root Detection">
            <p dangerouslySetInnerHTML={{ __html: `Detect and restrict compromised devices.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="App Store Controls">
            <p dangerouslySetInnerHTML={{ __html: `Restrict app installations to approved stores and applications.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Mobile App Security Testing">
            <p dangerouslySetInnerHTML={{ __html: `Conduct security testing of mobile applications.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Runtime Application Protection">
            <p dangerouslySetInnerHTML={{ __html: `Implement runtime protection for mobile applications.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Code Obfuscation">
            <p dangerouslySetInnerHTML={{ __html: `Protect mobile app code from reverse engineering.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="VPN Configuration">
            <p dangerouslySetInnerHTML={{ __html: `Implement secure VPN access for mobile devices.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Certificate Pinning">
            <p dangerouslySetInnerHTML={{ __html: `Pin SSL certificates to prevent man-in-the-middle attacks.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Public Wi-Fi Protection">
            <p dangerouslySetInnerHTML={{ __html: `Protect against public Wi-Fi security risks.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="BYOD Policy Implementation">
            <p dangerouslySetInnerHTML={{ __html: `Establish comprehensive bring-your-own-device policies.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Containerization">
            <p dangerouslySetInnerHTML={{ __html: `Separate corporate and personal data on devices.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Mobile Threat Defense">
            <p dangerouslySetInnerHTML={{ __html: `Deploy mobile threat detection and response solutions.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Mobile Security</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Mobile Security</div>
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
