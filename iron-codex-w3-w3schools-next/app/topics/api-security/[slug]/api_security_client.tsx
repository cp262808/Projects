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
  { label: "Authentication & Authorization", children: [
    { id: "control-1", label: "Implement OAuth 2.0 / Ope..." },
    { id: "control-2", label: "JWT Token Security" },
    { id: "control-3", label: "API Key Management" },
    { id: "control-4", label: "Fine-Grained Authorizatio..." },
  ]},
  { label: "Input Validation & Data Protection", children: [
    { id: "control-5", label: "Comprehensive Input Valid..." },
    { id: "control-6", label: "Schema Validation" },
    { id: "control-7", label: "SQL Injection Prevention" },
    { id: "control-8", label: "NoSQL Injection Preventio..." },
    { id: "control-9", label: "Data Encryption" },
  ]},
  { label: "Rate Limiting & DDoS Protection", children: [
    { id: "control-10", label: "Request Rate Limiting" },
    { id: "control-11", label: "Burst Protection" },
    { id: "control-12", label: "Resource-Based Rate Limit..." },
  ]},
  { label: "API Gateway & Infrastructure", children: [
    { id: "control-13", label: "API Gateway Security" },
    { id: "control-14", label: "Load Balancing & Failover" },
    { id: "control-15", label: "API Versioning Security" },
  ]},
  { label: "Monitoring & Logging", children: [
    { id: "control-16", label: "Comprehensive API Logging" },
    { id: "control-17", label: "Real-time Monitoring" },
    { id: "control-18", label: "Anomaly Detection" },
  ]},
  { label: "Testing & Validation", children: [
    { id: "control-19", label: "Automated Security Testin..." },
    { id: "control-20", label: "Penetration Testing" },
    { id: "control-21", label: "Vulnerability Scanning" },
    { id: "control-22", label: "API Documentation Securit..." },
    { id: "control-23", label: "Dependency Management" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/api-security/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16", "control-17", "control-18", "control-19", "control-20", "control-21", "control-22", "control-23"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "api security restgraphql security authentication rate limiting input validation and api gateway protection for securing application programming interfaces",
  "control-1": "implement oauth 20  openid connect use industrystandard oauth 20 for api authentication with openid connect for identity",
  "control-2": "jwt token security properly implement and validate json web tokens with strong signing algorithms",
  "control-3": "api key management secure generation distribution and rotation of api keys",
  "control-4": "finegrained authorization implement resourcelevel and operationlevel access controls",
  "control-5": "comprehensive input validation validate all api inputs including headers parameters and request bodies",
  "control-6": "schema validation use json schema or openapi specifications to validate requestresponse structure",
  "control-7": "sql injection prevention use parameterized queries and orm frameworks to prevent injection attacks",
  "control-8": "nosql injection prevention implement proper input sanitization for nosql databases",
  "control-9": "data encryption encrypt sensitive data in transit and at rest using strong encryption",
  "control-10": "request rate limiting implement peruser and perip rate limiting to prevent abuse",
  "control-11": "burst protection handle traffic spikes while maintaining legitimate user access",
  "control-12": "resourcebased rate limits different rate limits for different api endpoints based on resource intensity",
  "control-13": "api gateway security centralize security policies through api gateway implementation",
  "control-14": "load balancing  failover implement proper load distribution and failover mechanisms",
  "control-15": "api versioning security secure handling of api versions and deprecated endpoints",
  "control-16": "comprehensive api logging log all api requests responses and security events for monitoring",
  "control-17": "realtime monitoring monitor api performance errors and security threats in realtime",
  "control-18": "anomaly detection implement behavioral analysis to detect unusual api usage patterns",
  "control-19": "automated security testing integrate api security testing into cicd pipelines",
  "control-20": "penetration testing regular manual testing of api security controls",
  "control-21": "vulnerability scanning automated scanning for known api vulnerabilities and misconfigurations",
  "control-22": "api documentation security ensure api documentation doesnt expose sensitive information",
  "control-23": "dependency management regular updates and vulnerability scanning of api dependencies"
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
            <p>REST/GraphQL security, authentication, rate limiting, input validation, and API gateway protection for securing application programming interfaces.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Implement OAuth 2.0 / OpenID Connect">
            <p dangerouslySetInnerHTML={{ __html: `Use industry-standard OAuth 2.0 for API authentication with OpenID Connect for identity.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="JWT Token Security">
            <p dangerouslySetInnerHTML={{ __html: `Properly implement and validate JSON Web Tokens with strong signing algorithms.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="API Key Management">
            <p dangerouslySetInnerHTML={{ __html: `Secure generation, distribution, and rotation of API keys.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Fine-Grained Authorization">
            <p dangerouslySetInnerHTML={{ __html: `Implement resource-level and operation-level access controls.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Comprehensive Input Validation">
            <p dangerouslySetInnerHTML={{ __html: `Validate all API inputs including headers, parameters, and request bodies.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Schema Validation">
            <p dangerouslySetInnerHTML={{ __html: `Use JSON Schema or OpenAPI specifications to validate request/response structure.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="SQL Injection Prevention">
            <p dangerouslySetInnerHTML={{ __html: `Use parameterized queries and ORM frameworks to prevent injection attacks.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="NoSQL Injection Prevention">
            <p dangerouslySetInnerHTML={{ __html: `Implement proper input sanitization for NoSQL databases.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Data Encryption">
            <p dangerouslySetInnerHTML={{ __html: `Encrypt sensitive data in transit and at rest using strong encryption.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Request Rate Limiting">
            <p dangerouslySetInnerHTML={{ __html: `Implement per-user and per-IP rate limiting to prevent abuse.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Burst Protection">
            <p dangerouslySetInnerHTML={{ __html: `Handle traffic spikes while maintaining legitimate user access.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Resource-Based Rate Limits">
            <p dangerouslySetInnerHTML={{ __html: `Different rate limits for different API endpoints based on resource intensity.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="API Gateway Security">
            <p dangerouslySetInnerHTML={{ __html: `Centralize security policies through API gateway implementation.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Load Balancing & Failover">
            <p dangerouslySetInnerHTML={{ __html: `Implement proper load distribution and failover mechanisms.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="API Versioning Security">
            <p dangerouslySetInnerHTML={{ __html: `Secure handling of API versions and deprecated endpoints.` }} />
          </Card>
        );
      case "control-16":
        return (
          <Card title="Comprehensive API Logging">
            <p dangerouslySetInnerHTML={{ __html: `Log all API requests, responses, and security events for monitoring.` }} />
          </Card>
        );
      case "control-17":
        return (
          <Card title="Real-time Monitoring">
            <p dangerouslySetInnerHTML={{ __html: `Monitor API performance, errors, and security threats in real-time.` }} />
          </Card>
        );
      case "control-18":
        return (
          <Card title="Anomaly Detection">
            <p dangerouslySetInnerHTML={{ __html: `Implement behavioral analysis to detect unusual API usage patterns.` }} />
          </Card>
        );
      case "control-19":
        return (
          <Card title="Automated Security Testing">
            <p dangerouslySetInnerHTML={{ __html: `Integrate API security testing into CI/CD pipelines.` }} />
          </Card>
        );
      case "control-20":
        return (
          <Card title="Penetration Testing">
            <p dangerouslySetInnerHTML={{ __html: `Regular manual testing of API security controls.` }} />
          </Card>
        );
      case "control-21":
        return (
          <Card title="Vulnerability Scanning">
            <p dangerouslySetInnerHTML={{ __html: `Automated scanning for known API vulnerabilities and misconfigurations.` }} />
          </Card>
        );
      case "control-22":
        return (
          <Card title="API Documentation Security">
            <p dangerouslySetInnerHTML={{ __html: `Ensure API documentation doesn&apos;t expose sensitive information.` }} />
          </Card>
        );
      case "control-23":
        return (
          <Card title="Dependency Management">
            <p dangerouslySetInnerHTML={{ __html: `Regular updates and vulnerability scanning of API dependencies.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • API Security</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › API Security</div>
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
