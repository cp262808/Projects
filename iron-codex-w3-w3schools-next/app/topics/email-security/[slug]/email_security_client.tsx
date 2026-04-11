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
  { label: "Email Authentication", children: [
    { id: "control-1", label: "SPF Implementation" },
    { id: "control-2", label: "DKIM Signing" },
    { id: "control-3", label: "DMARC Policy" },
  ]},
  { label: "Threat Protection", children: [
    { id: "control-4", label: "Anti-Phishing" },
    { id: "control-5", label: "Malware Scanning" },
    { id: "control-6", label: "URL Protection" },
    { id: "control-7", label: "Sandboxing" },
  ]},
  { label: "Encryption & Privacy", children: [
    { id: "control-8", label: "TLS Encryption" },
    { id: "control-9", label: "End-to-End Encryption" },
  ]},
  { label: "Gateway & Filtering", children: [
    { id: "control-10", label: "Email Gateway Security" },
    { id: "control-11", label: "Spam Filtering" },
    { id: "control-12", label: "Content Filtering" },
    { id: "control-13", label: "Data Loss Prevention" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/email-security/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "email security spf dkim dmarc phishing protection email encryption gateway security and threat detection for comprehensive email security",
  "control-1": "spf implementation configure sender policy framework to prevent email spoofing",
  "control-2": "dkim signing implement domainkeys identified mail for email integrity verification",
  "control-3": "dmarc policy deploy domainbased message authentication for comprehensive email authentication",
  "control-4": "antiphishing implement advanced phishing detection and prevention mechanisms",
  "control-5": "malware scanning scan email attachments and content for malware and viruses",
  "control-6": "url protection analyze and protect against malicious urls in emails",
  "control-7": "sandboxing execute suspicious attachments in isolated environments",
  "control-8": "tls encryption enforce tls encryption for email transmission",
  "control-9": "endtoend encryption implement smime or pgp for sensitive email communications",
  "control-10": "email gateway security deploy secure email gateways with comprehensive filtering",
  "control-11": "spam filtering implement effective spam detection and filtering mechanisms",
  "control-12": "content filtering filter email content based on policies and compliance requirements",
  "control-13": "data loss prevention prevent sensitive data leakage through email communications"
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
            <p>SPF, DKIM, DMARC, phishing protection, email encryption, gateway security, and threat detection for comprehensive email security.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="SPF Implementation">
            <p dangerouslySetInnerHTML={{ __html: `Configure Sender Policy Framework to prevent email spoofing.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="DKIM Signing">
            <p dangerouslySetInnerHTML={{ __html: `Implement DomainKeys Identified Mail for email integrity verification.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="DMARC Policy">
            <p dangerouslySetInnerHTML={{ __html: `Deploy Domain-based Message Authentication for comprehensive email authentication.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Anti-Phishing">
            <p dangerouslySetInnerHTML={{ __html: `Implement advanced phishing detection and prevention mechanisms.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Malware Scanning">
            <p dangerouslySetInnerHTML={{ __html: `Scan email attachments and content for malware and viruses.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="URL Protection">
            <p dangerouslySetInnerHTML={{ __html: `Analyze and protect against malicious URLs in emails.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Sandboxing">
            <p dangerouslySetInnerHTML={{ __html: `Execute suspicious attachments in isolated environments.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="TLS Encryption">
            <p dangerouslySetInnerHTML={{ __html: `Enforce TLS encryption for email transmission.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="End-to-End Encryption">
            <p dangerouslySetInnerHTML={{ __html: `Implement S/MIME or PGP for sensitive email communications.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Email Gateway Security">
            <p dangerouslySetInnerHTML={{ __html: `Deploy secure email gateways with comprehensive filtering.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Spam Filtering">
            <p dangerouslySetInnerHTML={{ __html: `Implement effective spam detection and filtering mechanisms.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Content Filtering">
            <p dangerouslySetInnerHTML={{ __html: `Filter email content based on policies and compliance requirements.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Data Loss Prevention">
            <p dangerouslySetInnerHTML={{ __html: `Prevent sensitive data leakage through email communications.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Email Security</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Email Security</div>
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
