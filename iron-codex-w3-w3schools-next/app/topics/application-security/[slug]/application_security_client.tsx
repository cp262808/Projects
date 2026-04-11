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
  | "input-validation" | "prevent-sqli" | "prevent-xss" | "prevent-csrf"
  | "strong-auth" | "session-management" | "rbac" | "privilege-escalation"
  | "data-encryption" | "secure-storage" | "dlp" | "secure-file-handling"
  | "security-headers" | "error-handling" | "rate-limiting" | "config-management"
  | "sast" | "dast" | "iast" | "pentest" | "code-review" | "dependency-scan"
  | "owasp-top-10" | "quiz" | "snippets";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Input Validation (Injection)", children: [
    { id: "input-validation", label: "Input Validation" },
    { id: "prevent-sqli", label: "Prevent SQLi" },
    { id: "prevent-xss", label: "Prevent XSS" },
    { id: "prevent-csrf", label: "Prevent CSRF" },
  ]},
  { label: "Auth & Identity", children: [
    { id: "strong-auth", label: "Strong Authentication" },
    { id: "session-management", label: "Session Management" },
    { id: "rbac", label: "Role-Based Access" },
    { id: "privilege-escalation", label: "Privilege Escalation" },
  ]},
  { label: "Data Protection", children: [
    { id: "data-encryption", label: "Data Encryption" },
    { id: "secure-storage", label: "Secure Storage" },
    { id: "dlp", label: "Data Loss Prevention" },
    { id: "secure-file-handling", label: "Secure File Handling" },
  ]},
  { label: "App Config & Headers", children: [
    { id: "security-headers", label: "Security Headers" },
    { id: "error-handling", label: "Error Handling & Logging" },
    { id: "rate-limiting", label: "Rate Limiting" },
    { id: "config-management", label: "Config Management" },
  ]},
  { label: "Testing & Validation", children: [
    { id: "sast", label: "SAST" },
    { id: "dast", label: "DAST" },
    { id: "iast", label: "IAST" },
    { id: "pentest", label: "Penetration Testing" },
    { id: "code-review", label: "Code Review" },
    { id: "dependency-scan", label: "Dependency Scanning" },
  ]},
  { id: "owasp-top-10", label: "OWASP Top 10" },
  { id: "quiz", label: "Quiz" },
  { id: "snippets", label: "Snippets" },
];

const hrefFor = (slug: Slug) => `/topics/application-security/${slug}`;

const ALL_SLUGS: Slug[] = [
  "intro", "input-validation", "prevent-sqli", "prevent-xss", "prevent-csrf",
  "strong-auth", "session-management", "rbac", "privilege-escalation",
  "data-encryption", "secure-storage", "dlp", "secure-file-handling",
  "security-headers", "error-handling", "rate-limiting", "config-management",
  "sast", "dast", "iast", "pentest", "code-review", "dependency-scan",
  "owasp-top-10", "quiz", "snippets"
];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "web application security appsec owasp concepts",
  "input-validation": "input validation sanitization whitelist filter parameters regex",
  "prevent-sqli": "prevent sql injection parameterized queries prepared statements orm",
  "prevent-xss": "prevent cross site scripting xss encode html context csp",
  "prevent-csrf": "prevent csrf cross site request forgery anti-csrf tokens samesite",
  "strong-auth": "strong authentication mfa password policy brute force lockouts",
  "session-management": "session management secure httponly cookies timeouts invalidation",
  rbac: "role based access control authorization resource permissions",
  "privilege-escalation": "privilege escalation idor broken object level authorization bola",
  "data-encryption": "data encryption in transit at rest tls",
  "secure-storage": "secure storage database sensitive hashing bcrypt argon2",
  dlp: "data loss prevention exfiltration monitoring detection",
  "secure-file-handling": "secure file handling uploads extensions malware scanning sizes",
  "security-headers": "security headers hsts csp x-frame-options x-content-type-options",
  "error-handling": "error handling logging stack traces verbose info leakage secrets",
  "rate-limiting": "rate limiting ddos brute force throttling api",
  "config-management": "secure configuration defaults best practices devops",
  sast: "static application security testing sast code analysis whitebox",
  dast: "dynamic application security testing dast running application blackbox",
  iast: "interactive application security testing iast graybox instrumentation",
  pentest: "penetration testing manual hacking ethical red team assessment",
  "code-review": "manual security code review peer reviews audits",
  "dependency-scan": "dependency scanning sca software composition analysis vulnerabilities npm cve",
  "owasp-top-10": "owasp top 10 a01 a02 a03 injection broken access control misconfiguration",
  quiz: "quiz",
  snippets: "snippets csp headers sequelize parametized queries prepared statements",
};

function findFirstMatchingSlug(q: string): Slug | null {
  const needle = q.trim().toLowerCase();
  if (!needle) return null;
  for (const s of ALL_SLUGS) {
    if (SEARCH_TEXT[s].includes(needle)) return s;
  }
  return null;
}

const expressCspCode = `// Node.js (Helmet) — Security Headers & CSP
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted-cdn.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));`;

const sequelizeCode = `// Prevent SQLi with ORMs like Sequelize or Prisma
// BAD: Concatenating input
// sequelize.query("SELECT * FROM users WHERE name = '" + req.body.name + "'");

// GOOD: Bound parameters
sequelize.query('SELECT * FROM users WHERE name = :username', {
  replacements: { username: req.body.name },
  type: QueryTypes.SELECT
});`;

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
                  Web application security focuses on protecting web-based applications from various attack vectors. 
                  This includes addressing the most common vulnerabilities identified by OWASP and implementing comprehensive security controls throughout the software development lifecycle.
                </p>
                <div className="flex flex-wrap gap-2">
                  {"OWASP Security-Headers AppSec SAST/DAST".split(" ").map((p) => (
                    <span key={p} className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{p}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-center">
                  <b className="text-emerald-300">22</b>
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

      case "input-validation":
        return (
          <Card title="Input Validation">
            <p>Validate all user inputs on both client and server side using whitelist validation where possible.</p>
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 mt-3">
              <b>Implementation:</b>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Server-side input validation for all parameters</li>
                <li>Type, length, format, and range validation</li>
                <li>Regular expression validation for specific patterns</li>
              </ul>
            </div>
          </Card>
        );

      case "prevent-sqli":
        return (
          <Card title="Preventing SQL Injection (SQLi)">
            <p>Use parameterized queries, prepared statements, and Object Relational Mappers (ORMs) to isolate untrusted input from the SQL compiler.</p>
            <CodeBlock id="snip-sqli" code={sequelizeCode} />
          </Card>
        );

      case "prevent-xss":
        return (
          <Card title="Preventing Cross-Site Scripting (XSS)">
            <p>XSS allows attackers to execute malicious scripts in the victim&apos;s browser.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Context-aware output encoding (HTML, attributes, JS, CSS)</li>
              <li>Use modern frontend frameworks (React, Angular) that auto-escape by default</li>
              <li>Implement stringent Content Security Policy (CSP)</li>
            </ul>
          </Card>
        );

      case "prevent-csrf":
        return (
          <Card title="Preventing Cross-Site Request Forgery (CSRF)">
            <p>CSRF forces a logged-on victim&apos;s browser to send a forged HTTP request, including session cookies.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Implement anti-CSRF state tokens (Synchronizer Token Pattern)</li>
              <li>Use <code>SameSite=Lax</code> or <code>SameSite=Strict</code> flag on session cookies</li>
              <li>Require re-authentication for highly sensitive actions</li>
            </ul>
          </Card>
        );

      case "strong-auth":
        return (
          <Card title="Strong Authentication">
            <p>Authentication verifies the identity of users and services.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Use Multi-Factor Authentication (MFA)</li>
              <li>Do not ship default passwords; require password complexity and entropy</li>
              <li>Implement account lockout or delayed responses against brute-force attacks</li>
            </ul>
          </Card>
        );

      case "session-management":
        return (
          <Card title="Session Management">
            <p>Protect the session ID tokens after a user authenticates.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Generate new session IDs upon login</li>
              <li>Set <code>Secure</code> and <code>HttpOnly</code> flags on cookies</li>
              <li>Enforce absolute and idle session timeouts</li>
              <li>Invalidate sessions properly on the server upon logout</li>
            </ul>
          </Card>
        );

      case "rbac":
        return (
          <Card title="Role-Based Access Control">
            <p>Ensure that the application enforces who can access specific functions or APIs.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Check authorization server-side for every single request</li>
              <li>Deny by default</li>
            </ul>
          </Card>
        );

      case "privilege-escalation":
        return (
          <Card title="Preventing Privilege Escalation (BOLA/IDOR)">
            <p>Insecure Direct Object References (IDOR) / Broken Object Level Authorization (BOLA) occurs when an application provides direct access to objects based on user input without checking ownership.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Validate that the currently authenticated user has the right to access the inherently requested record (e.g., User A requesting `receipt/1234`)</li>
              <li>Use unpredictable, non-sequential UUIDs for record IDs</li>
            </ul>
          </Card>
        );

      case "data-encryption":
        return (
          <Card title="Data Encryption">
            <p>Encrypt sensitive data both in transit and at rest using strong encryption algorithms.</p>
          </Card>
        );

      case "secure-storage":
        return (
          <Card title="Secure Data Storage">
            <p>Implement proper database security and avoid storing sensitive data unnecessarily.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Hash passwords with strongly salted algorithms (Argon2, bcrypt, PBKDF2)</li>
              <li>Store API keys and secrets in robust vaults (HashiCorp Vault, AWS Secrets Manager) — never in source code</li>
            </ul>
          </Card>
        );

      case "dlp":
        return (
          <Card title="Data Loss Prevention">
            <p>Implement controls to prevent unauthorized data exfiltration, monitoring outbound API responses to ensure sensitive fields aren&apos;t overly exposed in JSON payloads.</p>
          </Card>
        );

      case "secure-file-handling":
        return (
          <Card title="Secure File Handling">
            <p>Implement secure file upload, download, and processing mechanisms.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Validate file types via magic numbers (file headers), not just extensions</li>
              <li>Store user uploads in a separate (perhaps untrusted) storage bucket / domain</li>
              <li>Strip metadata (EXIF) from images</li>
              <li>Scan uploads with an antivirus/malware engine</li>
            </ul>
          </Card>
        );

      case "security-headers":
        return (
          <Card title="Security Headers Configuration">
            <p>Implement HTTP security headers to lock down the browser context.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li><code>Strict-Transport-Security</code> (HSTS)</li>
              <li><code>Content-Security-Policy</code> (CSP)</li>
              <li><code>X-Frame-Options</code> (DENY or SAMEORIGIN for clickjacking)</li>
              <li><code>X-Content-Type-Options: nosniff</code></li>
            </ul>
            <CodeBlock id="snip-helmet" code={expressCspCode} />
          </Card>
        );

      case "error-handling":
        return (
          <Card title="Error Handling & Logging">
            <p>Implement proper error handling that doesn&apos;t leak sensitive information.</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Catch exceptions to avoid showing stack traces to end users</li>
              <li>Log detailed errors securely on the backend for debugging</li>
              <li>Alert on excessive 4xx or 5xx errors</li>
            </ul>
          </Card>
        );

      case "rate-limiting":
        return (
          <Card title="Rate Limiting & DoS Protection">
            <p>Implement rate limiting to prevent abuse, credential stuffing, and denial of service attacks against APIs and login endpoints.</p>
          </Card>
        );

      case "config-management":
        return (
          <Card title="Secure Configuration Management">
            <p>Ensure application and server configurations follow security best practices. Turn off debug modes (e.g. Django DEBUG=False, React production build) before shipping.</p>
          </Card>
        );

      case "sast":
        return (
          <Card title="Static Application Security Testing (SAST)">
            <p>Implement automated static code analysis to identify security vulnerabilities directly within the source code (Whitebox testing) during the CI/CD pipeline.</p>
          </Card>
        );

      case "dast":
        return (
          <Card title="Dynamic Application Security Testing (DAST)">
            <p>Perform runtime security testing of applications in a production-like staging environment (Blackbox testing). DAST tools crawl the running app and inject payloads.</p>
          </Card>
        );

      case "iast":
        return (
          <Card title="Interactive Application Security Testing (IAST)">
            <p>Combine static and dynamic testing approaches. IAST instruments the application from within the runtime to detect vulnerabilities as QA or automated tests traverse the app.</p>
          </Card>
        );

      case "pentest":
        return (
          <Card title="Penetration Testing">
            <p>Regular manual security testing by qualified, external security professionals to find complex logic flaws that automated tools miss.</p>
          </Card>
        );

      case "code-review":
        return (
          <Card title="Security Code Review">
            <p>Manual peer review of application code for security vulnerabilities and architectural design choices.</p>
          </Card>
        );

      case "dependency-scan":
        return (
          <Card title="Dependency Scanning (SCA)">
            <p>Regularly scan third-party components (NPM, PyPI, Maven) for known Common Vulnerabilities and Exposures (CVEs) using Software Composition Analysis tools.</p>
          </Card>
        );

      case "owasp-top-10":
        return (
          <Card title="OWASP Top 10 (2021)">
            <p>The Open Worldwide Application Security Project (OWASP) Top 10 represents a broad consensus on the most critical security risks to web applications.</p>
            <div className="grid gap-2 mt-4 text-sm">
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A01 - Broken Access Control:</b> Failures related to enforcement of proper authorization.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A02 - Cryptographic Failures:</b> Previously Sensitive Data Exposure.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A03 - Injection:</b> SQLi, NoSQLi, OS Command Injection.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A04 - Insecure Design:</b> Risks related to design and architectural flaws.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A05 - Security Misconfiguration:</b> Insecure default configurations.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A06 - Vulnerable and Outdated Components:</b> Using known vulnerable packages.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A07 - Identification and Authentication Failures:</b> Broken session management.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A08 - Software and Data Integrity Failures:</b> E.g., deserialization flaws, untrusted CI/CD pipelines.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A09 - Security Logging and Monitoring Failures:</b> Insufficient incident detection.</div>
              <div className="p-3 border border-slate-700 bg-slate-800 rounded"><b>A10 - Server-Side Request Forgery (SSRF):</b> Allowing attackers to force the server to make unauthorized requests.</div>
            </div>
          </Card>
        );

      case "quiz":
        return (
          <Card title="Quick Quiz">
            <Quiz
              question="What is the most effective defense against SQL Injection?"
              options={["Wielding a regular expression filter", "Using Prepared Statements / Parameterized Queries", "Encoding output on the client"]}
              answerIndex={1}
            />
            <div className="mt-4" />
            <Quiz
              question="A malicious user sends a specially crafted link to a victim that causes their browser to transfer funds. This is an example of:"
              options={["Cross-Site Request Forgery (CSRF)", "Cross-Site Scripting (XSS)", "BOLA / IDOR"]}
              answerIndex={0}
            />
          </Card>
        );

      case "snippets":
        return (
          <Card title="Copy-Paste Snippets">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <b>Node.js (Helmet - CSP)</b>
                <CodeBlock id="snip-helmet2" code={expressCspCode} />
              </div>
              <div>
                <b>Parameterized Query (Sequelize ORM)</b>
                <CodeBlock id="snip-sequelize" code={sequelizeCode} />
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
          <h1 className="text-sm font-bold tracking-wide">Iron‑Codex • Application Sec</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search topics… (e.g., XSS, CSRF)"
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Web Application Security</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t: any)=> (t as any).id === slug)?.label ?? "Introduction"}
          </h2>
          <Badge>22 Controls</Badge>
        </div>
        <SectionBody />
      </main>
    </div>
  );
}
