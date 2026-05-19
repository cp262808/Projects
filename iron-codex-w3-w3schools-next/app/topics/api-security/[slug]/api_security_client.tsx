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

function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="my-4 rounded-xl border border-slate-800 bg-[#0b0e15] overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/50 text-xs text-slate-400 font-mono">
          {title}
        </div>
      )}
      <div className="relative p-4 overflow-x-auto">
        <pre className="text-[13px] leading-6 text-sky-100 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function Alert({ title, children, type = "info" }: { title: string; children: React.ReactNode; type?: "info" | "warning" | "danger" }) {
  const colors = {
    info: "border-blue-500/30 bg-blue-500/10 text-blue-200",
    warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-200",
    danger: "border-rose-500/30 bg-rose-500/10 text-rose-200",
  };
  return (
    <div className={`p-4 rounded-xl border ${colors[type]} mb-4`}>
      <h4 className="font-semibold mb-1 flex items-center gap-2">
        {type === "danger" && <span aria-hidden>⚠️</span>}
        {title}
      </h4>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
}

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14" | "control-15" | "control-16" | "control-17" | "control-18" | "control-19" | "control-20" | "control-21" | "control-22" | "control-23";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Authentication & Authorization", children: [
    { id: "control-1", label: "Implement OAuth 2.0 / OIDC" },
    { id: "control-2", label: "JWT Token Security" },
    { id: "control-3", label: "API Key Management" },
    { id: "control-4", label: "Fine-Grained Authorization" },
  ]},
  { label: "Input Validation & Data", children: [
    { id: "control-5", label: "Mass Assignment Prevention" },
    { id: "control-6", label: "Schema Validation" },
    { id: "control-7", label: "SQL Injection Prevention" },
    { id: "control-8", label: "NoSQL Injection Prevention" },
    { id: "control-9", label: "Data Encryption" },
  ]},
  { label: "Rate Limiting & DDoS", children: [
    { id: "control-10", label: "Request Rate Limiting" },
    { id: "control-11", label: "Burst Protection" },
    { id: "control-12", label: "Resource-Based Limits" },
  ]},
  { label: "Gateway & Infrastructure", children: [
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
    { id: "control-19", label: "Automated Security Testing" },
    { id: "control-20", label: "Penetration Testing" },
    { id: "control-21", label: "Vulnerability Scanning" },
    { id: "control-22", label: "API Documentation Security" },
    { id: "control-23", label: "Dependency Management" },
  ]},
];

const hrefFor = (s: Slug) => `/topics/api-security/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15", "control-16", "control-17", "control-18", "control-19", "control-20", "control-21", "control-22", "control-23"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "api security restgraphql security authentication rate limiting input validation and api gateway protection for securing application programming interfaces owasp top 10",
  "control-1": "implement oauth 20 openid connect industrystandard oauth 20 api authentication openid connect identity authorization code pkce",
  "control-2": "jwt token security properly implement validate json web tokens strong signing algorithms none algorithm rsa hmac jwks",
  "control-3": "api key management secure generation distribution rotation api keys headers unauthenticated",
  "control-4": "finegrained authorization implement resourcelevel operationlevel access controls bola idor broken object level authorization owasp api1",
  "control-5": "mass assignment prevention broken object property level authorization validate inputs fields whitelist dto",
  "control-6": "schema validation json schema openapi specifications validate requestresponse structure type checking",
  "control-7": "sql injection prevention parameterized queries orm frameworks prevent injection attacks prepared statements",
  "control-8": "nosql injection prevention proper input sanitization nosql databases mongodb operators validation",
  "control-9": "data encryption encrypt sensitive data transit at rest strong encryption tls 1.3 aes",
  "control-10": "request rate limiting peruser perip rate limiting prevent abuse 429 too many requests",
  "control-11": "burst protection handle traffic spikes maintaining legitimate user access throttling leaky bucket token bucket",
  "control-12": "resourcebased rate limits different limits different api endpoints based resource intensity graphql query complexity",
  "control-13": "api gateway security centralize security policies api gateway implementation waf cloudflare aws api gateway kong",
  "control-14": "load balancing failover proper load distribution failover mechanisms high availability",
  "control-15": "api versioning security secure handling api versions deprecated endpoints retirement shadow apis zombie apis",
  "control-16": "comprehensive api logging log api requests responses security events monitoring sensitive data masking pii",
  "control-17": "realtime monitoring api performance errors security threats realtime datadog splunk grafana",
  "control-18": "anomaly detection behavioral analysis detect unusual api usage patterns ueba machine learning",
  "control-19": "automated security testing integrate api security testing cicd pipelines dast sast iast",
  "control-20": "penetration testing regular manual testing api security controls red teaming bug bounty",
  "control-21": "vulnerability scanning automated scanning known api vulnerabilities misconfigurations owasp zap burp suite",
  "control-22": "api documentation security ensure documentation doesnt expose sensitive information openapi swagger authentication leak",
  "control-23": "dependency management regular updates vulnerability scanning api dependencies snyk dependabot software supply chain"
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
          <Card title="Introduction to API Security">
            <p className="text-slate-300">
              Application Programming Interfaces (APIs) are the connective tissue of modern microservices, single-page applications, and mobile apps. 
              Because APIs expose underlying business logic and sensitive data directly to the internet, they are a primary target for attackers.
            </p>
            <Alert title="OWASP API Security Top 10 (2023)" type="warning">
              This module heavily references the latest <strong>OWASP API Security Top 10 (2023)</strong>. The top threats include Broken Object Level Authorization (BOLA), Broken Authentication, Broken Object Property Level Authorization, and Unrestricted Resource Consumption.
            </Alert>
            <p className="text-slate-300">
              The controls in this module will guide you through implementing authentication, rate limiting, strict input validation, and API gateway protections to secure your REST and GraphQL architectures.
            </p>
          </Card>
        );

      case "control-1":
        return (
          <Card title="Implement OAuth 2.0 / OpenID Connect">
            <p className="text-slate-300 mb-2">
              Avoid building bespoke authentication protocols. Leverage industry-standard frameworks like <strong>OAuth 2.0</strong> for authorization and <strong>OpenID Connect (OIDC)</strong> for authentication. 
              This addresses <span className="text-emerald-400">OWASP API2:2023 Broken Authentication</span>.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4">
              <li>Use the <strong>Authorization Code Flow with PKCE</strong> for mobile and single-page apps.</li>
              <li>Do not use the deprecated Implicit Flow.</li>
              <li>Delegate identity management to specialized providers (e.g., Okta, Auth0, AWS Cognito).</li>
            </ul>
            <CodeBlock 
              title="Secure API Route protecting against unauthenticated access (Express.js + express-oauth2-jwt-bearer)"
              code={`import { auth } from 'express-oauth2-jwt-bearer';\n\nconst checkJwt = auth({\n  audience: 'https://api.mycompany.com',\n  issuerBaseURL: 'https://mycompany.auth0.com/',\n});\n\n// Apply to all API routes\napp.use('/api', checkJwt);\n\napp.get('/api/secure-data', (req, res) => {\n  res.json({ data: "This is secured by OAuth 2.0!" });\n});`} 
            />
          </Card>
        );

      case "control-2":
        return (
          <Card title="JWT Token Security">
            <p className="text-slate-300">
              JSON Web Tokens (JWTs) are commonly used as bearer tokens, but misconfigurations can lead to complete authentication bypasses.
            </p>
            <Alert title="The 'None' Algorithm Vulnerability" type="danger">
              Attackers can manipulate the JWT header, changing the algorithm (<code>alg</code>) to <code>none</code>. If the backend library does not strictly enforce the expected algorithm, it will accept the unsigned token as valid, allowing the attacker to spoof any user ID.
            </Alert>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4">
              <li><strong>Always enforce the algorithm</strong> (e.g., <code>RS256</code> or <code>HS256</code>) during verification.</li>
              <li>Verify the <code>iss</code> (Issuer), <code>aud</code> (Audience), and <code>exp</code> (Expiration) claims.</li>
              <li>Use RS256 (asymmetric) over HS256 (symmetric) if the token must be validated by multiple microservices, allowing them to verify it using a public JWKS endpoint without sharing a secret key.</li>
            </ul>
          </Card>
        );

      case "control-3":
        return (
          <Card title="API Key Management">
            <p className="text-slate-300">
              API keys are meant to identify <em>clients</em> (the calling application), not individual users. They should be treated as sensitive secrets.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>Do not send API keys in the URL query string.</strong> URLs are logged in server access logs, browser history, and proxy logs. Always use the <code>Authorization</code> header or a custom header (e.g., <code>X-Api-Key</code>).</li>
              <li>Implement key rotation mechanisms and allow clients to have multiple active keys temporarily to facilitate zero-downtime rotation.</li>
              <li>Bind API keys to specific IP allowlists or domains when possible.</li>
            </ul>
          </Card>
        );

      case "control-4":
        return (
          <Card title="Fine-Grained Authorization (BOLA Prevention)">
            <p className="text-slate-300">
              <span className="text-emerald-400">OWASP API1:2023 Broken Object Level Authorization (BOLA/IDOR)</span> is the #1 API vulnerability. It occurs when an application does not properly verify that the currently authenticated user has permission to access the specific object requested by an ID.
            </p>
            <Alert title="Vulnerable Scenario" type="warning">
              User A requests <code>/api/invoices/105</code> and gets their invoice. User A then alters the request to <code>/api/invoices/106</code>. If the server only checks if User A is logged in, but not if Invoice 106 belongs to User A, data is leaked.
            </Alert>
            <CodeBlock 
              title="Secure Pattern: Ownership Verification (Node.js)"
              code={`app.get('/api/invoices/:id', async (req, res) => {\n  const invoiceId = req.params.id;\n  const currentUserId = req.auth.payload.sub;\n\n  // Database query MUST include the user ID as a filter constraint\n  const invoice = await db.invoices.findOne({\n    where: { \n      id: invoiceId, \n      owner_id: currentUserId // Critical BOLA protection\n    }\n  });\n\n  if (!invoice) return res.status(404).send('Not Found');\n  res.json(invoice);\n});`}
            />
            <p className="text-slate-300 mt-4">
              Alternatively, use unpredictable IDs (UUIDs v4) to prevent iteration attacks, though UUIDs do not replace the need for proper ownership authorization checks.
            </p>
          </Card>
        );

      case "control-5":
        return (
          <Card title="Mass Assignment Prevention">
            <p className="text-slate-300">
              <span className="text-emerald-400">OWASP API3:2023 Broken Object Property Level Authorization</span>. APIs often take JSON payloads and directly bind them to internal objects or database records (Mass Assignment). Attackers can inject unauthorized fields (e.g., <code>&quot;is_admin&quot;: true</code>) into the payload.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4">
              <li><strong>Never blindly map request bodies to database objects.</strong></li>
              <li>Use Data Transfer Objects (DTOs) or strict allowlists that explicitly define which fields a user is allowed to update.</li>
            </ul>
            <CodeBlock 
              title="Vulnerable vs Secure Implementation"
              code={`// VULNERABLE\n// Binds the entire req.body directly to the database update\nawait User.update(req.params.id, req.body);\n\n// SECURE\n// Explicitly destructure and allowlist only safe fields\nconst { email, firstName, lastName } = req.body;\nawait User.update(req.params.id, { email, firstName, lastName });`}
            />
          </Card>
        );

      case "control-6":
        return (
          <Card title="Schema Validation">
            <p className="text-slate-300">
              Reject malformed data before it reaches your business logic by validating all incoming requests against a strict schema definition.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-4">
              <li>Use JSON Schema or OpenAPI definitions to enforce expected types, formats, string lengths, and numeric ranges.</li>
              <li>Use robust validation libraries (e.g., Zod, Joi, or class-validator in Node/TypeScript).</li>
              <li>Fail fast and return a generic <code>400 Bad Request</code> without leaking stack traces or internal structure in the error message.</li>
            </ul>
          </Card>
        );

      case "control-7":
      case "control-8":
      case "control-9":
        return (
          <Card title="Injection & Data Protection">
            <p className="text-slate-300 mb-4">
              Injection flaws (SQL, NoSQL, OS Command) occur when untrusted data is sent to an interpreter as part of a command or query.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-emerald-300">SQL/NoSQL Injection Prevention</h4>
                <p className="text-sm text-slate-300">
                  Always use parameterized queries (Prepared Statements) or modern ORMs. Never concatenate strings to build database queries. For NoSQL (like MongoDB), ensure input types are validated (e.g., rejecting an object where a string is expected) to prevent operator injection (like <code>{`{"$ne": null}`}</code>).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-300">Data Encryption</h4>
                <p className="text-sm text-slate-300">
                  Enforce TLS 1.2 or TLS 1.3 for all API endpoints. Inside the network perimeter, encrypt sensitive data at rest using AES-256 and manage keys securely using a KMS (Key Management Service).
                </p>
              </div>
            </div>
          </Card>
        );

      case "control-10":
      case "control-11":
      case "control-12":
        return (
          <Card title="Rate Limiting & DDoS Protection">
            <p className="text-slate-300 mb-4">
              APIs are highly susceptible to automated abuse, scraping, credential stuffing, and DoS attacks (<span className="text-emerald-400">OWASP API4: Unrestricted Resource Consumption</span>).
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong>Per-User/Per-IP Limiting:</strong> Enforce quotas based on the authenticated User ID, or the IP address for public endpoints. Return <code>429 Too Many Requests</code>.</li>
              <li><strong>Burst Protection:</strong> Use algorithms like Token Bucket or Leaky Bucket to allow short bursts of traffic while capping the sustained rate.</li>
              <li><strong>Resource-Based Limits:</strong> Not all endpoints are equal. A password reset endpoint should have a much stricter rate limit than a static data fetch. In GraphQL, calculate query complexity to prevent nested query attacks.</li>
            </ul>
          </Card>
        );

      case "control-13":
      case "control-14":
      case "control-15":
        return (
          <Card title="API Gateway & Infrastructure">
            <p className="text-slate-300 mb-4">
              An API Gateway (e.g., AWS API Gateway, Kong, Apigee) acts as the single entry point for your API landscape, centralizing cross-cutting security concerns.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong>Centralized Security:</strong> Offload TLS termination, rate limiting, IP allowlisting, and WAF (Web Application Firewall) inspection to the gateway.</li>
              <li><strong>API Versioning &amp; Retirement:</strong> Maintain an inventory of all APIs. Deprecate and retire old versions securely. <span className="text-emerald-400">OWASP API9: Improper Inventory Management</span> highlights the danger of &quot;Shadow APIs&quot; (undocumented endpoints) and &quot;Zombie APIs&quot; (old, insecure versions left running).</li>
            </ul>
          </Card>
        );

      case "control-16":
      case "control-17":
      case "control-18":
        return (
          <Card title="Monitoring & Logging">
            <p className="text-slate-300 mb-4">
              Without proper visibility, breaches can go undetected for months. Logging API activity is critical for forensics and anomaly detection.
            </p>
            <Alert title="Data Privacy Warning" type="warning">
              Never log raw API request/response bodies that contain PII (Personally Identifiable Information), passwords, session tokens, or credit card numbers. Sanitize and mask logs before they are ingested into your SIEM.
            </Alert>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Log all authentication failures, access control denials, and rate limit triggers.</li>
              <li>Implement User Entity Behavior Analytics (UEBA) to detect anomalous usage patterns (e.g., a single user scraping thousands of records).</li>
            </ul>
          </Card>
        );

      case "control-19":
      case "control-20":
      case "control-21":
      case "control-22":
      case "control-23":
        return (
          <Card title="Security Testing & Validation">
            <p className="text-slate-300 mb-4">
              API security is an ongoing lifecycle, not a one-time setup. Integrate security testing into your CI/CD pipelines.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong>Automated Testing:</strong> Use DAST tools (like OWASP ZAP) configured with your OpenAPI specification to fuzz endpoints during the build process.</li>
              <li><strong>Dependency Scanning:</strong> Automatically scan your <code>package.json</code> or <code>requirements.txt</code> using tools like Snyk or Dependabot to prevent Supply Chain attacks.</li>
              <li><strong>Documentation Security:</strong> Do not publicly expose OpenAPI/Swagger UI endpoints for private APIs. Ensure documentation does not leak internal IP addresses or sensitive architectural details.</li>
            </ul>
          </Card>
        );

      default:
        return (
          <Card title="Section Content">
            <p className="text-slate-300">Detailed training content for this module is currently being expanded.</p>
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
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500/50"
            placeholder="Search topics (e.g. JWT, BOLA)…"
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
            className="shrink-0 grid place-items-center rounded-l-none rounded-r-lg bg-emerald-400 hover:bg-emerald-500 transition-colors text-slate-900 w-10 h-auto">
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
                    <summary className="cursor-pointer px-3 py-2 font-semibold hover:text-emerald-300 transition-colors">{item.label}</summary>
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

      <main className="px-5 sm:px-8 py-8 max-w-[900px]">
        <div className="text-slate-400 text-sm mb-2 font-mono">Cybersecurity › Application Security › API Security</div>
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}
          </h2>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}
