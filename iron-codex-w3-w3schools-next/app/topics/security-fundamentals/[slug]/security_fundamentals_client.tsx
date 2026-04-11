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

function CodeBlock({ id, code }: { id: string; code: string }) {
  return (
    <div className="relative">
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            const btn = document.getElementById(id + "-btn");
            if (btn) {
              const old = btn.textContent;
              btn.textContent = "Copied!";
              setTimeout(() => (btn.textContent = old), 1200);
            }
          } catch {}
        }}
        id={id + "-btn"}
        className="absolute top-2 right-2 text-xs px-2 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700"
        aria-label="Copy code"
      >
        Copy
      </button>
      <pre className="text-[13px] leading-6 overflow-x-auto p-3 rounded-xl border border-slate-800 bg-[#0b0e15] text-sky-100">
        <code>{code}</code>
      </pre>
    </div>
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
  | "cia-triad" | "defense-in-depth" | "least-privilege" | "security-by-design"
  | "risk-assessments" | "risk-treatment" | "risk-monitoring"
  | "security-policies" | "awareness-training" | "compliance-framework" | "security-audits" | "security-metrics"
  | "quiz" | "snippets";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Core Security Principles", children: [
    { id: "cia-triad", label: "CIA Triad" },
    { id: "defense-in-depth", label: "Defense in Depth" },
    { id: "least-privilege", label: "Least Privilege" },
    { id: "security-by-design", label: "Security by Design" },
  ]},
  { label: "Risk Management", children: [
    { id: "risk-assessments", label: "Risk Assessments" },
    { id: "risk-treatment", label: "Risk Treatment Plans" },
    { id: "risk-monitoring", label: "Risk Monitoring" },
  ]},
  { label: "Governance & Compliance", children: [
    { id: "security-policies", label: "Security Policies" },
    { id: "awareness-training", label: "Awareness Training" },
    { id: "compliance-framework", label: "Compliance Framework" },
    { id: "security-audits", label: "Security Audits" },
    { id: "security-metrics", label: "Security Metrics" },
  ]},
  { id: "quiz", label: "Quiz" },
  { id: "snippets", label: "Snippets" },
];

const hrefFor = (slug: Slug) => `/topics/security-fundamentals/${slug}`;

const ALL_SLUGS: Slug[] = [
  "intro", "cia-triad", "defense-in-depth", "least-privilege", "security-by-design",
  "risk-assessments", "risk-treatment", "risk-monitoring",
  "security-policies", "awareness-training", "compliance-framework", "security-audits", "security-metrics",
  "quiz", "snippets"
];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "security fundamentals principle overview",
  "cia-triad": "cia triad confidentiality integrity availability",
  "defense-in-depth": "defense in depth layers perimeter host application data",
  "least-privilege": "least privilege rbac just in time access",
  "security-by-design": "security by design secure devlopment threat modeling",
  "risk-assessments": "risk assessment calculus asset inventory",
  "risk-treatment": "risk treatment mitigation transfer acceptance avoidance",
  "risk-monitoring": "risk monitoring effectiveness controls",
  "security-policies": "security policies acceptable use incident response data classification",
  "awareness-training": "awareness training education phishing",
  "compliance-framework": "compliance framework nist iso 27001 cis controls",
  "security-audits": "security audits assessments",
  "security-metrics": "security metrics kpi program effectiveness",
  quiz: "quiz",
  snippets: "snippets templates python",
};

function findFirstMatchingSlug(q: string): Slug | null {
  const needle = q.trim().toLowerCase();
  if (!needle) return null;
  for (const s of ALL_SLUGS) {
    if (SEARCH_TEXT[s].includes(needle)) return s;
  }
  return null;
}

// Example snippets
const riskCalculationCode = `def calculate_risk_score(likelihood: int, impact: int) -> int:
    """
    Calculate the risk score based on likelihood and impact.
    Both should be an integer usually between 1-5.
    Returns: The final priority score.
    """
    score = likelihood * impact
    if score >= 15:
        return "CRITICAL"
    elif score >= 10:
        return "HIGH"
    elif score >= 5:
        return "MEDIUM"
    return "LOW"
`;

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
                  Security fundamentals form the bedrock of any effective cybersecurity program. This topic covers the essential concepts, principles, and frameworks that security professionals must understand to build and maintain secure systems.
                </p>
                <div className="flex flex-wrap gap-2">
                  {"CIA Risk Governance Frameworks".split(" ").map((p) => (
                    <span key={p} className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{p}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">12</b>
                  <div className="text-xs text-slate-400">Controls</div>
                </div>
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">3</b>
                  <div className="text-xs text-slate-400">Domains</div>
                </div>
              </div>
            </div>
          </Card>
        );

      case "cia-triad":
        return (
          <Card title="CIA Triad">
            <p>Establish confidentiality, integrity, and availability as core security objectives for all systems and data.</p>
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 mt-3">
              <b>Implementation:</b>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Data classification based on confidentiality requirements</li>
                <li>Integrity controls through checksums and digital signatures</li>
                <li>Availability through redundancy and disaster recovery</li>
              </ul>
            </div>
          </Card>
        );

      case "defense-in-depth":
        return (
          <Card title="Defense in Depth">
            <p>Implement multiple layers of security controls to create comprehensive protection. If one layer fails, another should catch the attack.</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Network perimeter security (firewalls, IDS)</li>
              <li>Host-based security (antivirus, HIPS)</li>
              <li>Application security (input validation, authentication)</li>
              <li>Data security (encryption, access controls)</li>
            </ul>
          </Card>
        );

      case "least-privilege":
        return (
          <Card title="Least Privilege">
            <p>Grant users and systems the minimum level of access required to perform their functions.</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Role-based access control (RBAC) implementation</li>
              <li>Regular access reviews and recertification</li>
              <li>Just-in-time access for administrative tasks</li>
            </ul>
          </Card>
        );

      case "security-by-design":
        return (
          <Card title="Security by Design">
            <p>Integrate security considerations into all phases of system development and deployment.</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Security requirements gathering</li>
              <li>Threat modeling during design phase</li>
              <li>Security testing throughout development</li>
              <li>Secure configuration management</li>
            </ul>
          </Card>
        );

      case "risk-assessments":
        return (
          <Card title="Risk Assessments">
            <p>Regularly identify, analyze, and evaluate security risks to organizational assets.</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Asset inventory and classification</li>
              <li>Threat and vulnerability identification</li>
              <li>Risk calculation (likelihood × impact)</li>
              <li>Risk treatment decisions</li>
            </ul>
          </Card>
        );

      case "risk-treatment":
        return (
          <Card title="Risk Treatment Plans">
            <p>Create and implement strategies to address identified risks through four main approaches:</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li><b>Mitigate / Reduce:</b> Apply security controls to lower risk.</li>
              <li><b>Transfer / Share:</b> Use cyber insurance or third-party sourcing.</li>
              <li><b>Avoid:</b> Stop the risky activity entirely.</li>
              <li><b>Accept:</b> Formally acknowledge the risk and proceed (requires management sign-off).</li>
            </ul>
          </Card>
        );

      case "risk-monitoring":
        return (
          <Card title="Risk Monitoring">
            <p>Continuously monitor risk levels and the effectiveness of implemented controls.</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Key Risk Indicators (KRIs) tracking</li>
              <li>Continuous control validation</li>
            </ul>
          </Card>
        );

      case "security-policies":
        return (
          <Card title="Security Policies">
            <p>Create comprehensive security policies that align with business objectives and regulatory requirements.</p>
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 mt-3">
              <b>Key Policies:</b>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Information Security Policy</li>
                <li>Acceptable Use Policy</li>
                <li>Incident Response Policy</li>
                <li>Data Classification Policy</li>
              </ul>
            </div>
          </Card>
        );

      case "awareness-training":
        return (
          <Card title="Awareness Training">
            <p>Educate employees on security policies, procedures, and best practices.</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Phishing simulations</li>
              <li>Annual security compliance sign-offs</li>
              <li>Role-specific training (e.g., secure coding for developers)</li>
            </ul>
          </Card>
        );

      case "compliance-framework":
        return (
          <Card title="Compliance Framework">
            <p>Align security practices with relevant regulatory requirements and industry standards.</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              <div className="border border-slate-700 p-3 rounded-lg bg-slate-800">
                <b className="text-emerald-300">NIST CSF</b><br />
                <span className="text-xs text-slate-400">Identify, Protect, Detect, Respond, Recover</span>
              </div>
              <div className="border border-slate-700 p-3 rounded-lg bg-slate-800">
                <b className="text-emerald-300">ISO 27001</b><br />
                <span className="text-xs text-slate-400">114 controls, ISMS standard, third-party certification</span>
              </div>
              <div className="border border-slate-700 p-3 rounded-lg bg-slate-800">
                <b className="text-emerald-300">CIS Controls</b><br />
                <span className="text-xs text-slate-400">Prioritized defensive actions</span>
              </div>
            </div>
          </Card>
        );

      case "security-audits":
        return (
          <Card title="Security Audits">
            <p>Regularly assess the effectiveness of security controls and compliance with policies.</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Internal audits versus External independent assessments</li>
              <li>SOC 2 Type II reports</li>
            </ul>
          </Card>
        );

      case "security-metrics":
        return (
          <Card title="Security Metrics">
            <p>Define and track key security metrics to measure program effectiveness.</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li>Mean Time to Detect (MTTD)</li>
              <li>Mean Time to Remediate (MTTR)</li>
              <li>Patching success rates</li>
            </ul>
          </Card>
        );

      case "quiz":
        return (
          <Card title="Quick Quiz">
            <Quiz
              question="What does the 'I' in the CIA triad stand for?"
              options={["Identity", "Integrity", "Intelligence"]}
              answerIndex={1}
            />
            <div className="mt-4" />
            <Quiz
              question="Using an antivirus AND a network firewall is an example of what principle?"
              options={["Least Privilege", "Defense in Depth", "Security by Design"]}
              answerIndex={1}
            />
          </Card>
        );

      case "snippets":
        return (
          <Card title="Copy-Paste Snippets">
            <div className="grid gap-3">
              <div>
                <b>Python: Simple Risk Score Calculation</b>
                <CodeBlock id="snip-risk" code={riskCalculationCode} />
              </div>
            </div>
          </Card>
        );
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide">Iron‑Codex • Security Fundamentals</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search topics… (e.g., CIA, NIST)"
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
          <PromoFlare label="Snippets" eyebrow="Practice" href={hrefFor("snippets")} size="sm" />
        </nav>
      </aside>

      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Security Fundamentals</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}
          </h2>
          <Badge>12 Controls</Badge>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}
