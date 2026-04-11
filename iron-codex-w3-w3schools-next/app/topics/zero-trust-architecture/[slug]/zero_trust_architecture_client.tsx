"use client";
import React, { useMemo, useState } from "react";
import { PromoFlare } from "@/components/PromoFlare";
import { useRouter } from "next/navigation";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-100">
      {children}
    </span>
  );
}

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

function Quiz({
  question,
  options,
  answerIndex,
}: {
  question: string;
  options: string[];
  answerIndex: number;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const [status, setStatus] = useState<"" | "right" | "wrong">("");
  return (
    <div className="space-y-3" data-quiz>
      <div className="font-semibold" id={`q-${question}`}>{question}</div>
      <div role="radiogroup" aria-labelledby={`q-${question}`} className="grid gap-2">
        {options.map((opt, i) => (
          <label
            key={i}
            className={
              "flex items-center gap-2 border rounded-xl px-3 py-2 cursor-pointer bg-slate-800/60 hover:bg-slate-800 " +
              (sel === i
                ? status === "right"
                  ? "outline outline-2 outline-emerald-400/80"
                  : status === "wrong"
                  ? "outline outline-2 outline-rose-400/80"
                  : ""
                : "")
            }
          >
            <input type="radio" name={question} onChange={() => setSel(i)} className="accent-emerald-400" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-2 rounded-xl bg-indigo-400/90 text-slate-900 font-bold"
          onClick={() => {
            if (sel === null) return;
            setStatus(sel === answerIndex ? "right" : "wrong");
          }}
        >
          Check
        </button>
        <button
          className="px-3 py-2 rounded-xl border border-slate-700"
          onClick={() => {
            setSel(null);
            setStatus("");
          }}
        >
          Reset
        </button>
      </div>
      {status === "right" && <div className="text-emerald-300">✓ Correct</div>}
      {status === "wrong" && <div className="text-rose-300">✗ Try again</div>}
    </div>
  );
}

export type Slug =
  | "intro"
  | "never-trust" | "least-privilege" | "assume-breach"
  | "micro-segmentation" | "sdp" | "nac"
  | "identity-centric" | "continuous-auth" | "conditional-access"
  | "data-centric" | "encryption-everywhere" | "data-classification"
  | "behavioral-analytics" | "risk-based" | "logging" | "automated-response"
  | "quiz";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Core Principles", children: [
    { id: "never-trust", label: "Never Trust, Always Verify" },
    { id: "least-privilege", label: "Least Privilege Access" },
    { id: "assume-breach", label: "Assume Breach" },
  ]},
  { label: "Network Architecture", children: [
    { id: "micro-segmentation", label: "Micro-Segmentation" },
    { id: "sdp", label: "Software-Defined Perimeter" },
    { id: "nac", label: "Network Access Control" },
  ]},
  { label: "Identity & Access", children: [
    { id: "identity-centric", label: "Identity-Centric Security" },
    { id: "continuous-auth", label: "Continuous Authentication" },
    { id: "conditional-access", label: "Conditional Access" },
  ]},
  { label: "Data Protection", children: [
    { id: "data-centric", label: "Data-Centric Security" },
    { id: "encryption-everywhere", label: "Encryption Everywhere" },
    { id: "data-classification", label: "Data Classification" },
  ]},
  { label: "Monitoring & Analytics", children: [
    { id: "behavioral-analytics", label: "Behavioral Analytics" },
    { id: "risk-based", label: "Risk-Based Decisions" },
    { id: "logging", label: "Comprehensive Logging" },
    { id: "automated-response", label: "Automated Response" },
  ]},
  { id: "quiz", label: "Quiz" },
];

const hrefFor = (slug: Slug) => `/topics/zero-trust-architecture/${slug}`;

const ALL_SLUGS: Slug[] = [
  "intro", "never-trust", "least-privilege", "assume-breach",
  "micro-segmentation", "sdp", "nac",
  "identity-centric", "continuous-auth", "conditional-access",
  "data-centric", "encryption-everywhere", "data-classification",
  "behavioral-analytics", "risk-based", "logging", "automated-response",
  "quiz"
];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "zero trust architecture zta principles network boundary",
  "never-trust": "never trust always verify implicit trust boundary",
  "least-privilege": "least privilege default deny access",
  "assume-breach": "assume breach inner perimeter lateral movement",
  "micro-segmentation": "micro-segmentation granular zones firewalls",
  sdp: "software-defined perimeter sdp zero trust network access ztna tunnel",
  nac: "network access control compliance trust scale",
  "identity-centric": "identity-centric security iam primary control point",
  "continuous-auth": "continuous authentication verification continuous session",
  "conditional-access": "conditional access risk posture signal",
  "data-centric": "data-centric security protect data location",
  "encryption-everywhere": "encryption everywhere transit rest use",
  "data-classification": "data classification sensitivity label tagging",
  "behavioral-analytics": "behavioral analytics ueba anomaly detection",
  "risk-based": "risk-based access real-time adaptive risk scoring",
  logging: "comprehensive logging event telemetry",
  "automated-response": "automated response soar policy violation",
  quiz: "quiz",
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
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <p>
                  Zero Trust Architecture (ZTA) replaces the traditional &quot;castle and moat&quot; security model with a strategy that removes implicit trust. 
                  It requires continuous verification of every user, device, and request—regardless of whether they originate inside or outside the corporate network.
                </p>
                <div className="flex flex-wrap gap-2">
                  {"ZTNA Micro-Segmentation SD-Perimeter".split(" ").map((p) => (
                    <span key={p} className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{p}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">16</b>
                  <div className="text-xs text-slate-400">Controls</div>
                </div>
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">5</b>
                  <div className="text-xs text-slate-400">Domains</div>
                </div>
              </div>
            </div>
          </Card>
        );

      case "never-trust":
        return (
          <Card title="Never Trust, Always Verify">
            <p>Verify every user and device before granting access to resources. There is no implicit trust granted based on network location or IP address.</p>
          </Card>
        );

      case "least-privilege":
        return (
          <Card title="Least Privilege Access">
            <p>Grant minimum necessary access for specific tasks. When permissions are bound too broadly, an attacker who compromises an account gains sweeping access.</p>
          </Card>
        );

      case "assume-breach":
        return (
          <Card title="Assume Breach">
            <p>Design security assuming attackers are already inside the network. This forces defenders to compartmentalize access and monitor everywhere, rather than relying on a strong perimeter.</p>
          </Card>
        );

      case "micro-segmentation":
        return (
          <Card title="Micro-Segmentation">
            <p>Create granular network zones with strict access controls around individual workloads to limit lateral movement.</p>
          </Card>
        );

      case "sdp":
        return (
          <Card title="Software-Defined Perimeter (SDP)">
            <p>Implement dynamic, encrypted tunnels for resource access. ZTNA (Zero Trust Network Access) gateways hide applications from the public internet.</p>
          </Card>
        );

      case "nac":
        return (
          <Card title="Network Access Control">
            <p>Control device access based on identity, compliance, and trust level before granting any network segment access.</p>
          </Card>
        );

      case "identity-centric":
        return (
          <Card title="Identity-Centric Security">
            <p>Identity is the new perimeter. Make identity (users, services, and devices) the primary security control point via an Identity Provider (IdP).</p>
          </Card>
        );

      case "continuous-auth":
        return (
          <Card title="Continuous Authentication">
            <p>Continuously verify user and device identity during sessions rather than a one-time login check.</p>
          </Card>
        );

      case "conditional-access":
        return (
          <Card title="Conditional Access">
            <p>Apply access policies dynamically based on risk, context (location, device posture, time of day), and the sensitivity of the resource being requested.</p>
          </Card>
        );

      case "data-centric":
        return (
          <Card title="Data-Centric Security">
            <p>Because the network is assumed compromised, security controls must follow the data regardless of its location or the access method being used.</p>
          </Card>
        );

      case "encryption-everywhere":
        return (
          <Card title="Encryption Everywhere">
            <p>Encrypt all data in transit between workloads, at rest on disks, and in use where confidential computing allows.</p>
          </Card>
        );

      case "data-classification":
        return (
          <Card title="Data Classification">
            <p>Classify and label data so that the Zero Trust policy engine knows what level of protection and authentication strength to require.</p>
          </Card>
        );

      case "behavioral-analytics":
        return (
          <Card title="Behavioral Analytics">
            <p>Monitor user and entity behavior (UEBA) for anomaly detection to revoke trust when an established user suddenly behaves out of character.</p>
          </Card>
        );

      case "risk-based":
        return (
          <Card title="Risk-Based Decisions">
            <p>Combine multiple telemetry signals into a real-time risk score, and allow the policy engine to demand step-up authentication when the score increases.</p>
          </Card>
        );

      case "logging":
        return (
          <Card title="Comprehensive Logging">
            <p>Log all access requests (both allowed and denied) and security events to feed back into the analytics engine.</p>
          </Card>
        );

      case "automated-response":
        return (
          <Card title="Automated Response">
            <p>Deploy SOAR platforms to automatically respond to security threats and rapidly sever access when policy violations occur.</p>
          </Card>
        );

      case "quiz":
        return (
          <Card title="Quick Quiz">
            <Quiz
              question="Zero Trust eliminates the concept of:"
              options={["Authentication", "Implicit Trust", "Firewalls"]}
              answerIndex={1}
            />
          </Card>
        );
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide">Iron‑Codex • Zero Trust</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search topics… (e.g., identity, SDP)"
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
            className="shrink-0 grid place-items-center rounded-l-none rounded-r-lg bg-emerald-400 text-slate-900 w-10 h-auto"
          >
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
          <h4 className="px-2 mt-4 mb-1 text-xs uppercase tracking-widest text-slate-400">Practice</h4>
          <PromoFlare label="Section Quiz" eyebrow="Practice" href={hrefFor("quiz")} size="sm" />
        </nav>
      </aside>

      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Zero Trust Architecture</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}
          </h2>
          <Badge>16 Controls</Badge>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}
