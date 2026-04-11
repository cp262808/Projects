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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Training & Education", children: [
    { id: "control-1", label: "Security Awareness Traini..." },
    { id: "control-2", label: "Role-Based Security Train..." },
    { id: "control-3", label: "New Employee Security Ori..." },
    { id: "control-4", label: "Regular Training Updates" },
  ]},
  { label: "Phishing & Social Engineering", children: [
    { id: "control-5", label: "Phishing Simulation Progr..." },
    { id: "control-6", label: "Social Engineering Awaren..." },
    { id: "control-7", label: "Incident Reporting Traini..." },
  ]},
  { label: "Culture & Metrics", children: [
    { id: "control-8", label: "Security Culture Developm..." },
    { id: "control-9", label: "Awareness Program Metrics" },
    { id: "control-10", label: "Communication Campaigns" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/security-awareness/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "security awareness security training phishing simulation social engineering defense and human risk management for building securityconscious organizational culture",
  "control-1": "security awareness training program implement comprehensive security awareness training for all employees",
  "control-2": "rolebased security training deliver targeted training based on employee roles and responsibilities",
  "control-3": "new employee security orientation provide security training as part of employee onboarding process",
  "control-4": "regular training updates maintain current training content reflecting latest threats and policies",
  "control-5": "phishing simulation programs conduct regular simulated phishing attacks to test and train employees",
  "control-6": "social engineering awareness educate employees about social engineering tactics and defenses",
  "control-7": "incident reporting training train employees on how to recognize and report security incidents",
  "control-8": "security culture development foster a culture of security awareness and responsibility",
  "control-9": "awareness program metrics track and measure effectiveness of security awareness programs",
  "control-10": "communication campaigns deploy ongoing security communication and awareness campaigns"
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
            <p>Security training, phishing simulation, social engineering defense, and human risk management for building security-conscious organizational culture.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Security Awareness Training Program">
            <p dangerouslySetInnerHTML={{ __html: `Implement comprehensive security awareness training for all employees.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Role-Based Security Training">
            <p dangerouslySetInnerHTML={{ __html: `Deliver targeted training based on employee roles and responsibilities.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="New Employee Security Orientation">
            <p dangerouslySetInnerHTML={{ __html: `Provide security training as part of employee onboarding process.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Regular Training Updates">
            <p dangerouslySetInnerHTML={{ __html: `Maintain current training content reflecting latest threats and policies.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Phishing Simulation Programs">
            <p dangerouslySetInnerHTML={{ __html: `Conduct regular simulated phishing attacks to test and train employees.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Social Engineering Awareness">
            <p dangerouslySetInnerHTML={{ __html: `Educate employees about social engineering tactics and defenses.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Incident Reporting Training">
            <p dangerouslySetInnerHTML={{ __html: `Train employees on how to recognize and report security incidents.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Security Culture Development">
            <p dangerouslySetInnerHTML={{ __html: `Foster a culture of security awareness and responsibility.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Awareness Program Metrics">
            <p dangerouslySetInnerHTML={{ __html: `Track and measure effectiveness of security awareness programs.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Communication Campaigns">
            <p dangerouslySetInnerHTML={{ __html: `Deploy ongoing security communication and awareness campaigns.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Security Awareness</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Security Awareness</div>
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
