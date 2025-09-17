"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Client component for IAM section pages.
 * Receives `slug` from the server page.
 */

// ---------- Small UI bits ----------------------------------------------------
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

// ---------- Content Model ----------------------------------------------------
export type Slug =
  | "intro" | "auth-basics" | "mfa" | "adaptive"
  | "sso" | "federation" | "oauth"
  | "rbac" | "abac" | "least"
  | "lifecycle" | "pam" | "monitoring"
  | "quiz" | "snippets";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Authentication", children: [
    { id: "auth-basics", label: "Basics" },
    { id: "mfa", label: "MFA" },
    { id: "adaptive", label: "Adaptive" },
  ]},
  { label: "SSO & Federation", children: [
    { id: "sso", label: "SSO" },
    { id: "federation", label: "Federation" },
    { id: "oauth", label: "OAuth2 & OIDC" },
  ]},
  { label: "Authorization", children: [
    { id: "rbac", label: "RBAC" },
    { id: "abac", label: "ABAC / Policy" },
    { id: "least", label: "Least Privilege & JIT" },
  ]},
  { label: "Operations", children: [
    { id: "lifecycle", label: "Identity Lifecycle" },
    { id: "pam", label: "PAM" },
    { id: "monitoring", label: "Monitoring & Governance" },
  ]},
  { id: "quiz", label: "Quiz" },
  { id: "snippets", label: "Snippets" },
];

// Codes
const mfaCode = `// Node.js (speakeasy) — Time-based One-Time Password
const speakeasy = require('speakeasy');
const secret = speakeasy.generateSecret({ name: 'Iron-Codex (user@example.com)' });
// Display secret.otpauth_url as QR for the authenticator app
function verify(token){
  return speakeasy.totp.verify({
    secret: secret.base32, encoding: 'base32', token, window: 1
  });
}`;

const jwtCode = `// Validate JWT (Node.js, jose)
import { jwtVerify, createRemoteJWKSet } from 'jose'
const JWKS = createRemoteJWKSet(new URL('https://issuer/.well-known/jwks.json'))
const { payload } = await jwtVerify(token, JWKS, {
  issuer: 'https://issuer/', audience: 'api://iron-codex'
})`;

const rbacCode = `// Simple RBAC check (TypeScript)
type Role = 'EMPLOYEE' | 'MANAGER' | 'ADMIN'
const can = {
  APPROVE_TIMESHEET: new Set<Role>(['MANAGER','ADMIN']),
}
function allow(action: keyof typeof can, role: Role){
  return can[action].has(role)
}`;

const regoCode = `# OPA/Rego (allow Finance to view non-HS docs)
package authz
allow {
  input.user.department == 'Finance'
  input.action == 'view'
  input.resource.classification != 'HS'
}`;

const scpRegionAllowlist = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": { "StringNotEquals": { "aws:RequestedRegion": ["us-east-1","us-west-2"] } }
    }
  ]
}`;

// ---------- Nav + Search helpers --------------------------------------------
const hrefFor = (slug: Slug) => `/topics/physical-security/${slug}`;

const ALL_SLUGS: Slug[] = [
  "intro","auth-basics","mfa","adaptive","sso","federation","oauth","rbac","abac","least","lifecycle","pam","monitoring","quiz","snippets"
];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "iam overview definition identification authentication authorization accounting",
  "auth-basics": "password hygiene rate limit webauthn fido2 phishing resistant factors",
  mfa: "multifactor authentication totp webauthn fido2 passkeys number matching disable basic auth legacy",
  adaptive: "risk based sign in user risk sign in risk conditional access device posture",
  sso: "sso saml idp session sign encrypt assertions key rotation",
  federation: "federation external idp claims mapping",
  oauth: "oauth2 openid connect pkce scopes jwt validation refresh token rotation dpop mtls",
  rbac: "roles permissions separation of duties",
  abac: "attributes policy opa rego",
  least: "least privilege jit just in time elevation",
  lifecycle: "provision deprovision access reviews service accounts keys rotation",
  pam: "privileged access management break glass emergency access",
  monitoring: "audit logs ueba analytics compliance mfa coverage",
  quiz: "quiz",
  snippets: "snippets aws scp azure conditional access",
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

  // Filtered nav by query
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

  // ---- Dev-only smoke tests -------------------------------------------------
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      try {
        console.assert(findFirstMatchingSlug("rbac") === "rbac", "rbac lookup");
        console.assert(findFirstMatchingSlug("  OAuth  ") === "oauth", "oauth trim/case");
        console.assert(findFirstMatchingSlug("break glass") === "pam", "break glass→pam");
        console.assert(findFirstMatchingSlug(" ") === null, "empty query→null");
        console.assert(hrefFor("intro") === "/topics/physical-security/intro", "hrefFor(intro)");
        console.assert(hrefFor("oauth") === "/topics/physical-security/oauth", "hrefFor(oauth)");
      } catch (e) { console.error(e); }
    }
  }, []);

  // --- Section bodies (curated content) -------------------------------------
  function SectionBody() {
    switch (slug) {
      case "intro":
        return (
          <Card title="Introduction">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <p>
                  IAM ensures <b>the right identity</b> gets <b>the right access</b> to
                  <b> the right resource</b> at <b>the right time</b>.
                </p>
                <div className="flex flex-wrap gap-2">
                  {"Identification Authentication Authorization Accounting".split(" ").map((p) => (
                    <span key={p} className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{p}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3">
                <b>Standards first:</b> align with NIST SP 800‑63‑4 for assurance, OWASP ASVS for app controls.
              </div>
            </div>
          </Card>
        );

      case "auth-basics":
        return (
          <Card title="Authentication Basics">
            <p>
              Authentication answers: <i>“Are you who you say you are?”</i> Factors: <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800">know</kbd>,
              <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800">have</kbd>,
              <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800">are</kbd>,
              <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800">where</kbd>.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Block breached passwords; avoid forced periodic resets (follow NIST).</li>
              <li>Rate‑limit &amp; lockout on failures; prefer WebAuthn/FIDO2 when possible.</li>
            </ul>
          </Card>
        );

      case "mfa":
        return (
          <Card title="Multi‑Factor Authentication (MFA)">
            <p>Use phishing‑resistant methods first (passkeys/WebAuthn, FIDO2). Avoid SMS when stronger options exist.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Enable <i>number matching</i> and additional context to mitigate MFA fatigue.</li>
              <li>Disable legacy/basic auth protocols (POP/IMAP/EWS) and require OAuth‑based modern auth.</li>
              <li>Provide backup codes; set recovery with identity proofing.</li>
            </ul>
          </Card>
        );

      case "adaptive":
        return (
          <Card title="Adaptive / Risk‑Based Auth">
            <p>Evaluate sign‑in and user risk signals; require step‑up or block in risky sessions.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Leverage sign‑in risk &amp; user risk policies; tie to device posture.</li>
            </ul>
          </Card>
        );

      case "sso":
        return (
          <Card title="Single Sign‑On (SSO)">
            <ul className="list-disc list-inside space-y-1">
              <li>Short IdP sessions + MFA; sign &amp; encrypt assertions.</li>
              <li>Rotate keys regularly; enforce audience &amp; clock‑skew limits.</li>
            </ul>
          </Card>
        );

      case "federation":
        return (
          <Card title="Identity Federation">
            <p>Trust external IdPs ("Login with…") and map claims to local roles with least privilege.</p>
          </Card>
        );

      case "oauth":
        return (
          <Card title="OAuth 2.0 & OpenID Connect">
            <div className="grid sm:grid-cols-2 gap-3">
              <ul className="list-disc list-inside space-y-1">
                <li>Prefer auth‑code + PKCE; validate issuer, audience, signature, exp.</li>
                <li>Use refresh token rotation; revoke on suspicious activity.</li>
                <li>Sender‑constrain tokens: DPoP (RFC 9449) or mTLS (RFC 8705) when suitable.</li>
              </ul>
              <CodeBlock id="jwt-code" code={jwtCode} />
            </div>
          </Card>
        );

      case "rbac":
        return (
          <Card title="Role‑Based Access Control (RBAC)">
            <p>Assign permissions to roles; assign roles to users. Implement Separation of Duties for risky pairs.</p>
            <CodeBlock id="rbac-code" code={rbacCode} />
          </Card>
        );

      case "abac":
        return (
          <Card title="ABAC / Policy‑Based">
            <p>Decide with attributes (user, resource, action, env). Version and test policies before enforce.</p>
            <CodeBlock id="rego-code" code={regoCode} />
          </Card>
        );

      case "least":
        return (
          <Card title="Least Privilege & Just‑In‑Time">
            <ul className="list-disc list-inside space-y-1">
              <li>Grant minimum required; time‑box elevation with approvals and reason.</li>
              <li>Separate admin vs. user accounts; record privileged sessions.</li>
            </ul>
          </Card>
        );

      case "lifecycle":
        return (
          <Card title="Identity Lifecycle">
            <ol className="list-decimal list-inside space-y-1">
              <li>Provision (birthright + request/approval)</li>
              <li>Move/Change (update roles; remove old)</li>
              <li>Deprovision (disable, archive, revoke)</li>
              <li>Review (manager/system owner attestations)</li>
            </ol>
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-3">
              <b>Service accounts:</b>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Avoid user‑managed keys where possible; otherwise rotate routinely and monitor use.</li>
                <li>Scope to single app; no shared credentials; store secrets in a vault.</li>
              </ul>
            </div>
          </Card>
        );

      case "pam":
        return (
          <Card title="Privileged Access Management (PAM)">
            <ul className="list-disc list-inside space-y-1">
              <li>Maintain two emergency (break‑glass) accounts with strong controls; exclude from CA.</li>
              <li>Vault secrets; rotate automatically; per‑admin named accounts.</li>
            </ul>
          </Card>
        );

      case "monitoring":
        return (
          <Card title="Monitoring & Governance">
            <ul className="list-disc list-inside space-y-1">
              <li>Central audit logs for authn/authz & admin actions; UEBA/identity analytics.</li>
              <li>Compliance reports: MFA coverage, access reviews; alert on risky OAuth grants.</li>
            </ul>
          </Card>
        );

      case "quiz":
        return (
          <Card title="Quick Quiz">
            <Quiz
              question="Which protocol adds identity on top of OAuth2?"
              options={["SAML 1.1", "OpenID Connect", "Kerberos"]}
              answerIndex={1}
            />
          </Card>
        );

      case "snippets":
        return (
          <Card title="Copy‑Paste Snippets">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-3">
                <b>Password policy (sample)</b>
                <pre className="mt-2 text-sm whitespace-pre-wrap">{`• Length ≥ 12; block top 10k breached
• Rotate only on compromise; prefer MFA
• Disallow reuse across systems
• Enforce lockout & rate‑limit`}</pre>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-3">
                <b>AWS SCP (region allow‑list)</b>
                <CodeBlock id="scp-code" code={scpRegionAllowlist} />
              </div>
            </div>
          </Card>
        );
    }
  }

  // -------------------------------- Render ----------------------------------
  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide">Iron‑Codex • Physical Security</h1>
        </div>
        <div className="p-3 border-b border-slate-800/70 flex items-stretch gap-0 overflow-hidden">
          <input
            className="min-w-0 flex-1 bg-slate-800/70 border border-slate-700 rounded-l-lg rounded-r-none border-r-0 px-3 py-2 outline-none"
            placeholder="Search IAM topics… (e.g., RBAC, OAuth2)"
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
                  <Link
                    href={hrefFor(item.id)}
                    className={
                      "block px-3 py-2 rounded-lg hover:bg-slate-800 " +
                      (slug === item.id ? "border border-emerald-400/40 bg-emerald-400/10" : "")
                    }
                  >
                    {item.label}
                  </Link>
                ) : (
                  <details open className="rounded-xl border border-slate-800 bg-slate-900/40">
                    <summary className="cursor-pointer px-3 py-2 font-semibold">{item.label}</summary>
                    <div className="px-2 pb-2 space-y-1">
                      {item.children.map((c) => (
                        <Link
                          key={c.id}
                          href={hrefFor(c.id)}
                          className={
                            "block px-3 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800 " +
                            (slug === c.id ? "border border-emerald-400/40 bg-emerald-400/10" : "")
                          }
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
          <h4 className="px-2 mt-4 mb-1 text-xs uppercase tracking-widest text-slate-400">Practice</h4>
          <Link href={hrefFor("quiz")} className="block px-3 py-2 rounded-lg hover:bg-slate-800">Section Quiz</Link>
          <Link href={hrefFor("snippets")} className="block px-3 py-2 rounded-lg hover:bg-slate-800">Snippets</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="px-5 sm:px-8 py-6 max-w-[1100px]">
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Physical Security</div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold">
            {TOC.flatMap((t)=> ("id" in t ? [t] : t.children)).find((t:any)=> (t as any).id === slug)?.label}
          </h2>
          <Badge>Beginner → Expert</Badge>
        </div>
        <SectionBody />
        <p className="mt-8 text-sm text-slate-400">
          Tip: If <code>/data/iam.json</code> exists, this page will auto‑merge content in future (via layout hook).
        </p>
      </main>
    </div>
  );
}
