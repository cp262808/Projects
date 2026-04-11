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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14" | "control-15" | "control-16" | "control-17" | "control-18" | "control-19" | "control-20" | "control-21" | "control-22" | "control-23";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Pipeline Security", children: [
    { id: "control-1", label: "Secure CI/CD Pipelines" },
    { id: "control-2", label: "Static Code Analysis (SAS..." },
    { id: "control-3", label: "Dynamic Testing (DAST)" },
    { id: "control-4", label: "Dependency Scanning" },
  ]},
  { label: "Code Security", children: [
    { id: "control-5", label: "Secure Coding Standards" },
    { id: "control-6", label: "Code Review Security" },
    { id: "control-7", label: "Secret Management" },
    { id: "control-8", label: "License Compliance" },
  ]},
  { label: "Infrastructure as Code", children: [
    { id: "control-9", label: "IaC Security Scanning" },
    { id: "control-10", label: "Security Templates" },
    { id: "control-11", label: "Configuration Validation" },
  ]},
  { label: "Container Security", children: [
    { id: "control-12", label: "Container Image Scanning" },
    { id: "control-13", label: "Registry Security" },
    { id: "control-14", label: "Runtime Protection" },
  ]},
  { label: "Monitoring & Response", children: [
    { id: "control-15", label: "Security Monitoring" },
    { id: "control-16", label: "Incident Response" },
    { id: "control-17", label: "Compliance Automation" },
  ]},
  { label: "Culture & Training", children: [
    { id: "control-18", label: "Security Training" },
    { id: "control-19", label: "Security Champions" },
    { id: "control-20", label: "Threat Modeling" },
    { id: "control-21", label: "Security Metrics" },
    { id: "control-22", label: "Feedback Loops" },
    { id: "control-23", label: "Policy as Code" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/devsecops/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16", "control-17", "control-18", "control-19", "control-20", "control-21", "control-22", "control-23"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "devsecops security in cicd sast dast infrastructure as code security and shiftleft practices for integrating security into development workflows",
  "control-1": "secure cicd pipelines implement security controls throughout cicd pipelines",
  "control-2": "static code analysis sast integrate static application security testing into build process",
  "control-3": "dynamic testing dast perform runtime security testing of applications",
  "control-4": "dependency scanning scan thirdparty dependencies for known vulnerabilities",
  "control-5": "secure coding standards establish and enforce secure coding guidelines",
  "control-6": "code review security include security focus in peer code reviews",
  "control-7": "secret management secure handling of secrets and credentials in code",
  "control-8": "license compliance ensure compliance with open source license requirements",
  "control-9": "iac security scanning scan infrastructure code for security misconfigurations",
  "control-10": "security templates use preapproved secure infrastructure templates",
  "control-11": "configuration validation validate infrastructure configurations against security policies",
  "control-12": "container image scanning scan container images for vulnerabilities and misconfigurations",
  "control-13": "registry security secure container registries and image distribution",
  "control-14": "runtime protection monitor containers at runtime for security threats",
  "control-15": "security monitoring monitor applications and infrastructure for security events",
  "control-16": "incident response integrate incident response into devops workflows",
  "control-17": "compliance automation automate compliance checking and reporting",
  "control-18": "security training provide security training for development teams",
  "control-19": "security champions establish security champion programs within teams",
  "control-20": "threat modeling integrate threat modeling into design processes",
  "control-21": "security metrics track and measure security performance in devops",
  "control-22": "feedback loops create feedback mechanisms for security improvements",
  "control-23": "policy as code implement security policies as code for automation"
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
            <p>Security in CI/CD, SAST, DAST, infrastructure as code security, and shift-left practices for integrating security into development workflows.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Secure CI/CD Pipelines">
            <p dangerouslySetInnerHTML={{ __html: `Implement security controls throughout CI/CD pipelines.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Static Code Analysis (SAST)">
            <p dangerouslySetInnerHTML={{ __html: `Integrate static application security testing into build process.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Dynamic Testing (DAST)">
            <p dangerouslySetInnerHTML={{ __html: `Perform runtime security testing of applications.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Dependency Scanning">
            <p dangerouslySetInnerHTML={{ __html: `Scan third-party dependencies for known vulnerabilities.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Secure Coding Standards">
            <p dangerouslySetInnerHTML={{ __html: `Establish and enforce secure coding guidelines.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Code Review Security">
            <p dangerouslySetInnerHTML={{ __html: `Include security focus in peer code reviews.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Secret Management">
            <p dangerouslySetInnerHTML={{ __html: `Secure handling of secrets and credentials in code.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="License Compliance">
            <p dangerouslySetInnerHTML={{ __html: `Ensure compliance with open source license requirements.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="IaC Security Scanning">
            <p dangerouslySetInnerHTML={{ __html: `Scan infrastructure code for security misconfigurations.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Security Templates">
            <p dangerouslySetInnerHTML={{ __html: `Use pre-approved secure infrastructure templates.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Configuration Validation">
            <p dangerouslySetInnerHTML={{ __html: `Validate infrastructure configurations against security policies.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Container Image Scanning">
            <p dangerouslySetInnerHTML={{ __html: `Scan container images for vulnerabilities and misconfigurations.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Registry Security">
            <p dangerouslySetInnerHTML={{ __html: `Secure container registries and image distribution.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Runtime Protection">
            <p dangerouslySetInnerHTML={{ __html: `Monitor containers at runtime for security threats.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="Security Monitoring">
            <p dangerouslySetInnerHTML={{ __html: `Monitor applications and infrastructure for security events.` }} />
          </Card>
        );
      case "control-16":
        return (
          <Card title="Incident Response">
            <p dangerouslySetInnerHTML={{ __html: `Integrate incident response into DevOps workflows.` }} />
          </Card>
        );
      case "control-17":
        return (
          <Card title="Compliance Automation">
            <p dangerouslySetInnerHTML={{ __html: `Automate compliance checking and reporting.` }} />
          </Card>
        );
      case "control-18":
        return (
          <Card title="Security Training">
            <p dangerouslySetInnerHTML={{ __html: `Provide security training for development teams.` }} />
          </Card>
        );
      case "control-19":
        return (
          <Card title="Security Champions">
            <p dangerouslySetInnerHTML={{ __html: `Establish security champion programs within teams.` }} />
          </Card>
        );
      case "control-20":
        return (
          <Card title="Threat Modeling">
            <p dangerouslySetInnerHTML={{ __html: `Integrate threat modeling into design processes.` }} />
          </Card>
        );
      case "control-21":
        return (
          <Card title="Security Metrics">
            <p dangerouslySetInnerHTML={{ __html: `Track and measure security performance in DevOps.` }} />
          </Card>
        );
      case "control-22":
        return (
          <Card title="Feedback Loops">
            <p dangerouslySetInnerHTML={{ __html: `Create feedback mechanisms for security improvements.` }} />
          </Card>
        );
      case "control-23":
        return (
          <Card title="Policy as Code">
            <p dangerouslySetInnerHTML={{ __html: `Implement security policies as code for automation.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • DevSecOps</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › DevSecOps</div>
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
