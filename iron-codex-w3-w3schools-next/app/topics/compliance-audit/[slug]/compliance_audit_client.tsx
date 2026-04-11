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
  | "req-assessment" | "program-mgmt" | "policy-dev"
  | "control-design" | "control-testing" | "remediation"
  | "internal-audit" | "external-audit" | "evidence-mgmt" | "audit-response"
  | "compliance-mon" | "compliance-rep" | "metrics-kpi" | "risk-integration" | "training-awareness"
  | "frameworks" | "quiz";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Compliance Framework", children: [
    { id: "req-assessment", label: "Regulatory Req Assessment" },
    { id: "program-mgmt", label: "Program Management" },
    { id: "policy-dev", label: "Policy Development" },
  ]},
  { label: "Control Implementation", children: [
    { id: "control-design", label: "Control Design" },
    { id: "control-testing", label: "Testing & Validation" },
    { id: "remediation", label: "Remediation Management" },
  ]},
  { label: "Audit Management", children: [
    { id: "internal-audit", label: "Internal Audit" },
    { id: "external-audit", label: "External Audit" },
    { id: "evidence-mgmt", label: "Evidence Management" },
    { id: "audit-response", label: "Audit Response" },
  ]},
  { label: "Monitoring & Reporting", children: [
    { id: "compliance-mon", label: "Compliance Monitoring" },
    { id: "compliance-rep", label: "Compliance Reporting" },
    { id: "metrics-kpi", label: "Metrics and KPIs" },
    { id: "risk-integration", label: "Risk Integration" },
    { id: "training-awareness", label: "Training & Awareness" },
  ]},
  { id: "frameworks", label: "Key Frameworks" },
  { id: "quiz", label: "Quiz" },
];

const hrefFor = (slug: Slug) => `/topics/compliance-audit/${slug}`;

const ALL_SLUGS: Slug[] = [
  "intro", "req-assessment", "program-mgmt", "policy-dev",
  "control-design", "control-testing", "remediation",
  "internal-audit", "external-audit", "evidence-mgmt", "audit-response",
  "compliance-mon", "compliance-rep", "metrics-kpi", "risk-integration", "training-awareness",
  "frameworks", "quiz"
];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "compliance audit sox pci hipaa regulatory",
  "req-assessment": "regulatory assessment requirements landscape gap analysis",
  "program-mgmt": "program management governance",
  "policy-dev": "policy procedure development",
  "control-design": "control design implementation mapping",
  "control-testing": "control testing validation effectiveness",
  remediation: "remediation management deficiencies gaps",
  "internal-audit": "internal audit program procedure",
  "external-audit": "external audit coordination auditors",
  "evidence-mgmt": "evidence management collection documentation",
  "audit-response": "audit response findings recommendations management",
  "compliance-mon": "compliance monitoring continuous measurement",
  "compliance-rep": "compliance reporting stakeholders",
  "metrics-kpi": "metrics kpi performance indicators",
  "risk-integration": "risk assessment integration",
  "training-awareness": "training awareness compliance",
  frameworks: "frameworks sox pci-dss hipaa iso 27001 gdpr soc2",
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
                  Compliance and audit management ensures organizations meet diverse regulatory requirements, industry standards, and internal policies.
                  This topic covers governance frameworks, control assessment, and how to successfully navigate the audit lifecycle.
                </p>
                <div className="flex flex-wrap gap-2">
                  {"Audit SOC2 Evidence Compliance".split(" ").map((p) => (
                    <span key={p} className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{p}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">15</b>
                  <div className="text-xs text-slate-400">Controls</div>
                </div>
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">4</b>
                  <div className="text-xs text-slate-400">Domains</div>
                </div>
              </div>
            </div>
          </Card>
        );

      case "req-assessment":
        return (
          <Card title="Regulatory Requirements Assessment">
            <p>Identify and document all applicable regulatory and compliance requirements.</p>
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 mt-3">
              <b>Implementation:</b>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Regulatory landscape analysis and mapping</li>
                <li>Gap analysis against current controls</li>
                <li>Requirements documentation and ownership</li>
              </ul>
            </div>
          </Card>
        );

      case "program-mgmt":
        return (
          <Card title="Compliance Program Management">
            <p>Establish a governance structure for ongoing compliance management, ensuring leadership buy-in and resource allocation.</p>
          </Card>
        );

      case "policy-dev":
        return (
          <Card title="Policy and Procedure Development">
            <p>Create binding corporate policies and standard operating procedures that explicitly address regulatory requirements.</p>
          </Card>
        );

      case "control-design":
        return (
          <Card title="Control Design and Implementation">
            <p>Design and deploy operational and technical security controls to meet specific compliance mandates.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Control mapping to regulatory requirements</li>
              <li>Implementation plans and timelines</li>
            </ul>
          </Card>
        );

      case "control-testing":
        return (
          <Card title="Control Testing and Validation">
            <p>Regularly test and validate the effectiveness of implemented controls. An untested control provides a false sense of security.</p>
          </Card>
        );

      case "remediation":
        return (
          <Card title="Remediation Management">
            <p>Track, manage, and verify the remediation of control deficiencies and gaps found during testing.</p>
          </Card>
        );

      case "internal-audit":
        return (
          <Card title="Internal Audit Program">
            <p>Establish regular internal audit processes to self-evaluate compliance posture before external auditors arrive.</p>
          </Card>
        );

      case "external-audit":
        return (
          <Card title="External Audit Coordination">
            <p>Manage relationships and coordination with external auditors (e.g., CPA firms for SOC 2 or QSA&apos;s for PCI-DSS).</p>
          </Card>
        );

      case "evidence-mgmt":
        return (
          <Card title="Evidence Management">
            <p>Systematically collect, organize, and maintain audit evidence and artifacts (e.g., screenshots, logs, policy sign-offs) to prove controls operate as designed.</p>
          </Card>
        );

      case "audit-response":
        return (
          <Card title="Audit Response Management">
            <p>Manage official responses to negative audit findings, exceptions, and recommendations provided by the assessment firm.</p>
          </Card>
        );

      case "compliance-mon":
        return (
          <Card title="Compliance Monitoring">
            <p>Implement continuous monitoring tools to maintain visibility into compliance status between annual audits.</p>
          </Card>
        );

      case "compliance-rep":
        return (
          <Card title="Compliance Reporting">
            <p>Generate regular compliance reports for executive stakeholders and board members.</p>
          </Card>
        );

      case "metrics-kpi":
        return (
          <Card title="Metrics and KPIs">
            <p>Define and track key compliance metrics (e.g., percent of systems patched within SLA, percent of employees completing training).</p>
          </Card>
        );

      case "risk-integration":
        return (
          <Card title="Risk Assessment Integration">
            <p>Integrate compliance requirements directly into enterprise risk assessment processes, measuring non-compliance as an explicit business risk.</p>
          </Card>
        );

      case "training-awareness":
        return (
          <Card title="Training and Awareness">
            <p>Provide mandated compliance training and security awareness education customized for the specific framework requirements (e.g., HIPAA PHI handling rules).</p>
          </Card>
        );

      case "frameworks":
        return (
          <Card title="Key Compliance Frameworks">
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="border border-slate-700 p-3 rounded bg-slate-800">
                <h3 className="text-emerald-300 font-bold mb-1">SOX (Sarbanes-Oxley)</h3>
                <p className="text-slate-400">Financial reporting and internal controls for public companies.</p>
              </div>
              <div className="border border-slate-700 p-3 rounded bg-slate-800">
                <h3 className="text-emerald-300 font-bold mb-1">PCI-DSS</h3>
                <p className="text-slate-400">Payment card industry data security standards (12 core requirements).</p>
              </div>
              <div className="border border-slate-700 p-3 rounded bg-slate-800">
                <h3 className="text-emerald-300 font-bold mb-1">HIPAA</h3>
                <p className="text-slate-400">Healthcare privacy/security: Administrative, Physical, and Technical safeguards.</p>
              </div>
              <div className="border border-slate-700 p-3 rounded bg-slate-800">
                <h3 className="text-emerald-300 font-bold mb-1">ISO 27001</h3>
                <p className="text-slate-400">International standard for building an Information Security Management System (ISMS).</p>
              </div>
              <div className="border border-slate-700 p-3 rounded bg-slate-800">
                <h3 className="text-emerald-300 font-bold mb-1">GDPR</h3>
                <p className="text-slate-400">EU Data protection regulation focusing on subject rights, consent, and breach notification.</p>
              </div>
              <div className="border border-slate-700 p-3 rounded bg-slate-800">
                <h3 className="text-emerald-300 font-bold mb-1">SOC 2</h3>
                <p className="text-slate-400">Service organization controls based on Trust Services Criteria (security, availability, etc).</p>
              </div>
            </div>
          </Card>
        );

      case "quiz":
        return (
          <Card title="Quick Quiz">
            <Quiz
              question="What is the artifact provided to external auditors to prove a control was performed?"
              options={["A Policy Document", "Evidence", "A Risk Assessment"]}
              answerIndex={1}
            />
            <div className="mt-4" />
            <Quiz
              question="Which framework specifically models Trust Services Criteria (TSC) such as Security, Availability, and Confidentiality?"
              options={["PCI-DSS", "SOC 2", "HIPAA"]}
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
          <h1 className="text-sm font-bold tracking-wide">Iron‑Codex • Compliance</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search topics… (e.g., SOC 2, Audit)"
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Compliance & Audit</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}
          </h2>
          <Badge>15 Controls</Badge>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}
