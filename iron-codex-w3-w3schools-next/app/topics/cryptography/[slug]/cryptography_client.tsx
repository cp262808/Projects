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

export type Slug = "intro" | "control-1" | "control-2" | "control-3" | "control-4" | "control-5" | "control-6" | "control-7" | "control-8" | "control-9" | "control-10" | "control-11" | "control-12" | "control-13" | "control-14" | "control-15";

type TocItem = { id: Slug; label: string } | { label: string; children: { id: Slug; label: string }[] };

const TOC: TocItem[] = [
  { id: "intro", label: "Introduction" },
  { label: "Encryption", children: [
    { id: "control-1", label: "Symmetric Encryption" },
    { id: "control-2", label: "Asymmetric Encryption" },
    { id: "control-3", label: "Hybrid Encryption Systems" },
  ]},
  { label: "Hashing & Integrity", children: [
    { id: "control-4", label: "Cryptographic Hash Functi..." },
    { id: "control-5", label: "Message Authentication Co..." },
    { id: "control-6", label: "Digital Signatures" },
  ]},
  { label: "Key Management", children: [
    { id: "control-7", label: "Key Generation" },
    { id: "control-8", label: "Key Storage" },
    { id: "control-9", label: "Key Rotation" },
    { id: "control-10", label: "Key Escrow" },
  ]},
  { label: "PKI & Certificates", children: [
    { id: "control-11", label: "Public Key Infrastructure" },
    { id: "control-12", label: "Certificate Management" },
    { id: "control-13", label: "Certificate Validation" },
  ]},
  { label: "Implementation Security", children: [
    { id: "control-14", label: "Secure Coding Practices" },
    { id: "control-15", label: "Side-Channel Attack Prote..." },
  ]},
];

const hrefFor = (s: Slug) => `/topics/cryptography/${s}`;

const ALL_SLUGS: Slug[] = ["intro", "control-1", "control-2", "control-3", "control-4", "control-5", "control-6", "control-7", "control-8", "control-9", "control-10", "control-11", "control-12", "control-13", "control-14", "control-15"];

const SEARCH_TEXT: Record<Slug, string> = {
  intro: "cryptography encryption algorithms hashing digital signatures pki key management and crypto implementations for protecting data confidentiality and integrity",
  "control-1": "symmetric encryption implement aes encryption for highperformance data protection",
  "control-2": "asymmetric encryption use rsaecc for key exchange and digital signatures",
  "control-3": "hybrid encryption systems combine symmetric and asymmetric encryption for optimal security and performance",
  "control-4": "cryptographic hash functions use sha256 or sha3 for data integrity verification",
  "control-5": "message authentication codes implement hmac for authenticated message integrity",
  "control-6": "digital signatures deploy digital signature schemes for nonrepudiation",
  "control-7": "key generation use cryptographically secure random number generators",
  "control-8": "key storage secure key storage using hsms or secure key vaults",
  "control-9": "key rotation implement regular key rotation and lifecycle management",
  "control-10": "key escrow establish key recovery procedures for business continuity",
  "control-11": "public key infrastructure deploy pki for certificatebased authentication and encryption",
  "control-12": "certificate management manage certificate lifecycle including issuance renewal and revocation",
  "control-13": "certificate validation implement proper certificate chain validation and crl checking",
  "control-14": "secure coding practices avoid common cryptographic implementation vulnerabilities",
  "control-15": "sidechannel attack protection implement countermeasures against timing and power analysis attacks"
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
            <p>Encryption algorithms, hashing, digital signatures, PKI, key management, and crypto implementations for protecting data confidentiality and integrity.</p>
          </Card>
        );
      case "control-1":
        return (
          <Card title="Symmetric Encryption">
            <p dangerouslySetInnerHTML={{ __html: `Implement AES encryption for high-performance data protection.` }} />
          </Card>
        );
      case "control-2":
        return (
          <Card title="Asymmetric Encryption">
            <p dangerouslySetInnerHTML={{ __html: `Use RSA/ECC for key exchange and digital signatures.` }} />
          </Card>
        );
      case "control-3":
        return (
          <Card title="Hybrid Encryption Systems">
            <p dangerouslySetInnerHTML={{ __html: `Combine symmetric and asymmetric encryption for optimal security and performance.` }} />
          </Card>
        );
      case "control-4":
        return (
          <Card title="Cryptographic Hash Functions">
            <p dangerouslySetInnerHTML={{ __html: `Use SHA-256 or SHA-3 for data integrity verification.` }} />
          </Card>
        );
      case "control-5":
        return (
          <Card title="Message Authentication Codes">
            <p dangerouslySetInnerHTML={{ __html: `Implement HMAC for authenticated message integrity.` }} />
          </Card>
        );
      case "control-6":
        return (
          <Card title="Digital Signatures">
            <p dangerouslySetInnerHTML={{ __html: `Deploy digital signature schemes for non-repudiation.` }} />
          </Card>
        );
      case "control-7":
        return (
          <Card title="Key Generation">
            <p dangerouslySetInnerHTML={{ __html: `Use cryptographically secure random number generators.` }} />
          </Card>
        );
      case "control-8":
        return (
          <Card title="Key Storage">
            <p dangerouslySetInnerHTML={{ __html: `Secure key storage using HSMs or secure key vaults.` }} />
          </Card>
        );
      case "control-9":
        return (
          <Card title="Key Rotation">
            <p dangerouslySetInnerHTML={{ __html: `Implement regular key rotation and lifecycle management.` }} />
          </Card>
        );
      case "control-10":
        return (
          <Card title="Key Escrow">
            <p dangerouslySetInnerHTML={{ __html: `Establish key recovery procedures for business continuity.` }} />
          </Card>
        );
      case "control-11":
        return (
          <Card title="Public Key Infrastructure">
            <p dangerouslySetInnerHTML={{ __html: `Deploy PKI for certificate-based authentication and encryption.` }} />
          </Card>
        );
      case "control-12":
        return (
          <Card title="Certificate Management">
            <p dangerouslySetInnerHTML={{ __html: `Manage certificate lifecycle including issuance, renewal, and revocation.` }} />
          </Card>
        );
      case "control-13":
        return (
          <Card title="Certificate Validation">
            <p dangerouslySetInnerHTML={{ __html: `Implement proper certificate chain validation and CRL checking.` }} />
          </Card>
        );
      case "control-14":
        return (
          <Card title="Secure Coding Practices">
            <p dangerouslySetInnerHTML={{ __html: `Avoid common cryptographic implementation vulnerabilities.` }} />
          </Card>
        );
      case "control-15":
        return (
          <Card title="Side-Channel Attack Protection">
            <p dangerouslySetInnerHTML={{ __html: `Implement countermeasures against timing and power analysis attacks.` }} />
          </Card>
        );

    }
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-slate-950 text-slate-100">
      <aside className="sticky top-0 h-screen overflow-auto border-r border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800/70">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <h1 className="text-sm font-bold tracking-wide break-all max-w-[200px]">Iron‑Codex • Cryptography</h1>
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
        <div className="text-slate-400 text-sm mb-2">Cybersecurity › Cryptography</div>
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
