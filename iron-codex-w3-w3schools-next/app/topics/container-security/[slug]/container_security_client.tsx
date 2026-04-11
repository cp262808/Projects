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
  { label: "Image Security", children: [
    { id: "control-1", label: "Image Vulnerability Scann..." },
    { id: "control-2", label: "Base Image Security" },
    { id: "control-3", label: "Image Signing" },
    { id: "control-4", label: "Registry Security" },
  ]},
  { label: "Runtime Security", children: [
    { id: "control-5", label: "Container Runtime Hardeni..." },
    { id: "control-6", label: "Security Contexts" },
    { id: "control-7", label: "Resource Limits" },
    { id: "control-8", label: "Runtime Monitoring" },
  ]},
  { label: "Kubernetes Security", children: [
    { id: "control-9", label: "RBAC Implementation" },
    { id: "control-10", label: "Pod Security Standards" },
    { id: "control-11", label: "Network Policies" },
    { id: "control-12", label: "API Server Security" },
  ]},
  { label: "Secrets & Configuration", children: [
    { id: "control-13", label: "Secrets Management" },
    { id: "control-14", label: "Configuration Security" },
    { id: "control-15", label: "Environment Isolation" },
  ]},
  { label: "Monitoring & Compliance", children: [
    { id: "control-16", label: "Audit Logging" },
    { id: "control-17", label: "Compliance Scanning" },
    { id: "control-18", label: "Incident Response" },
    { id: "control-19", label: "Backup and Recovery" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/container-security/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16", "control-17", "control-18", "control-19"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "container security docker security kubernetes hardening image scanning runtime protection and orchestration security for containerized applications",
  "control-1": "image vulnerability scanning scan container images for vulnerabilities before deployment",
  "control-2": "base image security use minimal distroless or hardened base images",
  "control-3": "image signing sign and verify container image integrity",
  "control-4": "registry security secure container registries with access controls",
  "control-5": "container runtime hardening configure secure container runtime settings",
  "control-6": "security contexts implement proper security contexts and capabilities",
  "control-7": "resource limits set cpu memory and io resource constraints",
  "control-8": "runtime monitoring monitor container behavior for anomalies",
  "control-9": "rbac implementation implement rolebased access control in kubernetes",
  "control-10": "pod security standards enforce pod security policies and standards",
  "control-11": "network policies control network traffic between pods and services",
  "control-12": "api server security secure kubernetes api server configuration",
  "control-13": "secrets management secure handling of sensitive configuration data",
  "control-14": "configuration security secure container and orchestrator configuration",
  "control-15": "environment isolation proper isolation between development staging and production",
  "control-16": "audit logging comprehensive logging of container and orchestrator events",
  "control-17": "compliance scanning regular compliance checks against security benchmarks",
  "control-18": "incident response containerspecific incident response procedures",
  "control-19": "backup and recovery secure backup strategies for containerized applications"
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
            <p>Docker security, Kubernetes hardening, image scanning, runtime protection, and orchestration security for containerized applications.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Image Vulnerability Scanning">
            <p dangerouslySetInnerHTML={{ __html: `Scan container images for vulnerabilities before deployment.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Base Image Security">
            <p dangerouslySetInnerHTML={{ __html: `Use minimal, distroless, or hardened base images.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Image Signing">
            <p dangerouslySetInnerHTML={{ __html: `Sign and verify container image integrity.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Registry Security">
            <p dangerouslySetInnerHTML={{ __html: `Secure container registries with access controls.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Container Runtime Hardening">
            <p dangerouslySetInnerHTML={{ __html: `Configure secure container runtime settings.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Security Contexts">
            <p dangerouslySetInnerHTML={{ __html: `Implement proper security contexts and capabilities.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Resource Limits">
            <p dangerouslySetInnerHTML={{ __html: `Set CPU, memory, and I/O resource constraints.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Runtime Monitoring">
            <p dangerouslySetInnerHTML={{ __html: `Monitor container behavior for anomalies.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="RBAC Implementation">
            <p dangerouslySetInnerHTML={{ __html: `Implement role-based access control in Kubernetes.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Pod Security Standards">
            <p dangerouslySetInnerHTML={{ __html: `Enforce pod security policies and standards.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Network Policies">
            <p dangerouslySetInnerHTML={{ __html: `Control network traffic between pods and services.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="API Server Security">
            <p dangerouslySetInnerHTML={{ __html: `Secure Kubernetes API server configuration.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Secrets Management">
            <p dangerouslySetInnerHTML={{ __html: `Secure handling of sensitive configuration data.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Configuration Security">
            <p dangerouslySetInnerHTML={{ __html: `Secure container and orchestrator configuration.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="Environment Isolation">
            <p dangerouslySetInnerHTML={{ __html: `Proper isolation between development, staging, and production.` }} />
          </Card>
        );
      case "control-16":
        return (
          <Card title="Audit Logging">
            <p dangerouslySetInnerHTML={{ __html: `Comprehensive logging of container and orchestrator events.` }} />
          </Card>
        );
      case "control-17":
        return (
          <Card title="Compliance Scanning">
            <p dangerouslySetInnerHTML={{ __html: `Regular compliance checks against security benchmarks.` }} />
          </Card>
        );
      case "control-18":
        return (
          <Card title="Incident Response">
            <p dangerouslySetInnerHTML={{ __html: `Container-specific incident response procedures.` }} />
          </Card>
        );
      case "control-19":
        return (
          <Card title="Backup and Recovery">
            <p dangerouslySetInnerHTML={{ __html: `Secure backup strategies for containerized applications.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Container Security</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Container Security</div>
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
