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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14" | "control-15" | "control-16" | "control-17" | "control-18" | "control-19" | "control-20" | "control-21" | "control-22" | "control-23" | "control-24" | "control-25" | "control-26" | "control-27";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Planning & Scoping", children: [
    { id: "control-1", label: "Engagement Scoping and Ru..." },
    { id: "control-2", label: "Threat Modeling" },
    { id: "control-3", label: "Risk Assessment" },
  ]},
  { label: "Reconnaissance", children: [
    { id: "control-4", label: "Open Source Intelligence ..." },
    { id: "control-5", label: "Network Reconnaissance" },
    { id: "control-6", label: "Social Engineering Reconn..." },
  ]},
  { label: "Initial Access", children: [
    { id: "control-7", label: "External Penetration Test..." },
    { id: "control-8", label: "Phishing Campaigns" },
    { id: "control-9", label: "Physical Security Testing" },
    { id: "control-10", label: "Wireless Network Testing" },
  ]},
  { label: "Post-Exploitation", children: [
    { id: "control-11", label: "Privilege Escalation" },
    { id: "control-12", label: "Lateral Movement" },
    { id: "control-13", label: "Persistence Mechanisms" },
    { id: "control-14", label: "Data Exfiltration Testing" },
  ]},
  { label: "Social Engineering", children: [
    { id: "control-15", label: "Pretexting Operations" },
    { id: "control-16", label: "Vishing and Smishing" },
    { id: "control-17", label: "Physical Social Engineeri..." },
  ]},
  { label: "Advanced Techniques", children: [
    { id: "control-18", label: "Custom Exploit Developmen..." },
    { id: "control-19", label: "Evasion Techniques" },
    { id: "control-20", label: "Living off the Land" },
    { id: "control-21", label: "Supply Chain Testing" },
  ]},
  { label: "Testing Methodology", children: [
    { id: "control-22", label: "Adversary Emulation" },
    { id: "control-23", label: "Purple Team Exercises" },
    { id: "control-24", label: "Tabletop Exercises" },
  ]},
  { label: "Reporting & Remediation", children: [
    { id: "control-25", label: "Comprehensive Reporting" },
    { id: "control-26", label: "Executive Briefings" },
    { id: "control-27", label: "Remediation Validation" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/red-team-operations/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16", "control-17", "control-18", "control-19", "control-20", "control-21", "control-22", "control-23", "control-24", "control-25", "control-26", "control-27"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "red team operations penetration testing social engineering adversary simulation exploit development and offensive security for comprehensive security assessment and validation",
  "control-1": "engagement scoping and rules define clear scope objectives and rules of engagement for red team operations",
  "control-2": "threat modeling model specific threat actors and their tactics for realistic simulation",
  "control-3": "risk assessment assess potential risks of testing activities and implement safeguards",
  "control-4": "open source intelligence osint gather intelligence from publicly available sources",
  "control-5": "network reconnaissance identify network topology services and potential entry points",
  "control-6": "social engineering reconnaissance gather information about personnel and organizational structure",
  "control-7": "external penetration testing test externalfacing systems and applications for vulnerabilities",
  "control-8": "phishing campaigns conduct controlled phishing tests to assess user awareness",
  "control-9": "physical security testing test physical security controls and access restrictions",
  "control-10": "wireless network testing assess wireless network security and potential entry points",
  "control-11": "privilege escalation test ability to escalate privileges within compromised systems",
  "control-12": "lateral movement assess network segmentation and internal security controls",
  "control-13": "persistence mechanisms test detection capabilities for persistence techniques",
  "control-14": "data exfiltration testing simulate data theft to test data loss prevention controls",
  "control-15": "pretexting operations test human defenses through fabricated scenarios and personas",
  "control-16": "vishing and smishing voice and smsbased social engineering assessments",
  "control-17": "physical social engineering inperson social engineering and tailgating assessments",
  "control-18": "custom exploit development develop custom exploits for identified vulnerabilities",
  "control-19": "evasion techniques test security controls ability to detect advanced evasion",
  "control-20": "living off the land use legitimate tools and processes for malicious purposes",
  "control-21": "supply chain testing assess thirdparty and supply chain security risks",
  "control-22": "adversary emulation emulate specific threat actor behaviors and techniques",
  "control-23": "purple team exercises collaborative testing with defensive teams for improvement",
  "control-24": "tabletop exercises scenariobased discussion exercises for incident response",
  "control-25": "comprehensive reporting document findings with actionable remediation guidance",
  "control-26": "executive briefings present strategic insights to executive leadership",
  "control-27": "remediation validation retest systems after remediation to verify fixes"
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
            <p>Penetration testing, social engineering, adversary simulation, exploit development, and offensive security for comprehensive security assessment and validation.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Engagement Scoping and Rules">
            <p dangerouslySetInnerHTML={{ __html: `Define clear scope, objectives, and rules of engagement for red team operations.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Threat Modeling">
            <p dangerouslySetInnerHTML={{ __html: `Model specific threat actors and their tactics for realistic simulation.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Risk Assessment">
            <p dangerouslySetInnerHTML={{ __html: `Assess potential risks of testing activities and implement safeguards.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Open Source Intelligence (OSINT)">
            <p dangerouslySetInnerHTML={{ __html: `Gather intelligence from publicly available sources.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Network Reconnaissance">
            <p dangerouslySetInnerHTML={{ __html: `Identify network topology, services, and potential entry points.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Social Engineering Reconnaissance">
            <p dangerouslySetInnerHTML={{ __html: `Gather information about personnel and organizational structure.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="External Penetration Testing">
            <p dangerouslySetInnerHTML={{ __html: `Test external-facing systems and applications for vulnerabilities.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Phishing Campaigns">
            <p dangerouslySetInnerHTML={{ __html: `Conduct controlled phishing tests to assess user awareness.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Physical Security Testing">
            <p dangerouslySetInnerHTML={{ __html: `Test physical security controls and access restrictions.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Wireless Network Testing">
            <p dangerouslySetInnerHTML={{ __html: `Assess wireless network security and potential entry points.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Privilege Escalation">
            <p dangerouslySetInnerHTML={{ __html: `Test ability to escalate privileges within compromised systems.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Lateral Movement">
            <p dangerouslySetInnerHTML={{ __html: `Assess network segmentation and internal security controls.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Persistence Mechanisms">
            <p dangerouslySetInnerHTML={{ __html: `Test detection capabilities for persistence techniques.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Data Exfiltration Testing">
            <p dangerouslySetInnerHTML={{ __html: `Simulate data theft to test data loss prevention controls.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="Pretexting Operations">
            <p dangerouslySetInnerHTML={{ __html: `Test human defenses through fabricated scenarios and personas.` }} />
          </Card>
        );
      case "control-16":
        return (
          <Card title="Vishing and Smishing">
            <p dangerouslySetInnerHTML={{ __html: `Voice and SMS-based social engineering assessments.` }} />
          </Card>
        );
      case "control-17":
        return (
          <Card title="Physical Social Engineering">
            <p dangerouslySetInnerHTML={{ __html: `In-person social engineering and tailgating assessments.` }} />
          </Card>
        );
      case "control-18":
        return (
          <Card title="Custom Exploit Development">
            <p dangerouslySetInnerHTML={{ __html: `Develop custom exploits for identified vulnerabilities.` }} />
          </Card>
        );
      case "control-19":
        return (
          <Card title="Evasion Techniques">
            <p dangerouslySetInnerHTML={{ __html: `Test security controls&apos; ability to detect advanced evasion.` }} />
          </Card>
        );
      case "control-20":
        return (
          <Card title="Living off the Land">
            <p dangerouslySetInnerHTML={{ __html: `Use legitimate tools and processes for malicious purposes.` }} />
          </Card>
        );
      case "control-21":
        return (
          <Card title="Supply Chain Testing">
            <p dangerouslySetInnerHTML={{ __html: `Assess third-party and supply chain security risks.` }} />
          </Card>
        );
      case "control-22":
        return (
          <Card title="Adversary Emulation">
            <p dangerouslySetInnerHTML={{ __html: `Emulate specific threat actor behaviors and techniques.` }} />
          </Card>
        );
      case "control-23":
        return (
          <Card title="Purple Team Exercises">
            <p dangerouslySetInnerHTML={{ __html: `Collaborative testing with defensive teams for improvement.` }} />
          </Card>
        );
      case "control-24":
        return (
          <Card title="Tabletop Exercises">
            <p dangerouslySetInnerHTML={{ __html: `Scenario-based discussion exercises for incident response.` }} />
          </Card>
        );
      case "control-25":
        return (
          <Card title="Comprehensive Reporting">
            <p dangerouslySetInnerHTML={{ __html: `Document findings with actionable remediation guidance.` }} />
          </Card>
        );
      case "control-26":
        return (
          <Card title="Executive Briefings">
            <p dangerouslySetInnerHTML={{ __html: `Present strategic insights to executive leadership.` }} />
          </Card>
        );
      case "control-27":
        return (
          <Card title="Remediation Validation">
            <p dangerouslySetInnerHTML={{ __html: `Re-test systems after remediation to verify fixes.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Red Team Operations</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Red Team Operations</div>
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
