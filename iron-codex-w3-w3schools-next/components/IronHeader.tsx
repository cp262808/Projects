'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/** Fixed Iron Codex Header - Option 2: Add invisible hover bridge
 *  Keeps the visual gap but adds an invisible area to maintain hover state
 */

const secondaryLinks: [string, string][] = [
  ["Security Fundamentals", "/topics/security-fundamentals/intro"],
  ["AppSec", "/topics/application-security/intro"],
  ["API Security", "/topics/api-security/intro"],
  ["Cloud Security", "/topics/cloud-security/intro"],
  ["Network Security", "/topics/network-security/intro"],
  ["Identity & Access", "/topics/identity-access-management/intro"],
  ["Containers & K8s", "/topics/container-security/intro"],
  ["Incident Response", "/guides/incident-response/intro"],
  ["Vendor Reviews", "/guides/saas-security/intro"],
  ["SaaS Security", "/guides/saas-security/intro"],
  ["Crypto & Key Mgmt", "/topics/cryptography/intro"],
  ["Logging & Monitoring", "/topics/logging-and-monitoring/intro"],
  ["GenAI Security", "/topics/ai-ml-security/intro"],
  ["DevSecOps", "/topics/devsecops/intro"],
];

const toolsCategories: { title: string; items: [string, string][] }[] = [
  { title: "Vulnerability Assessment", items: [["Nmap", "/tools/nmap"],["OpenVAS", "/tools/openvas"],["Nuclei", "/tools/nuclei"]] },
  { title: "Web Application Security", items: [["OWASP ZAP", "/tools/owasp-zap"],["Burp Suite", "/tools/burp-suite"],["Nikto", "/tools/nikto"]] },
  { title: "Network Security", items: [["Wireshark", "/tools/wireshark"],["Snort", "/tools/snort"],["Suricata", "/tools/suricata"]] },
  { title: "Digital Forensics", items: [["Autopsy", "/tools/autopsy"],["Volatility", "/tools/volatility"],["YARA", "/tools/yara"]] },
  { title: "Cloud Security", items: [["Scout Suite", "/tools/scout-suite"],["Prowler", "/tools/prowler"],["CloudMapper", "/tools/cloudmapper"]] },
  { title: "Container Security", items: [["Trivy", "/tools/trivy"],["Falco", "/tools/falco"],["Clair", "/tools/clair"]] },
  { title: "SIEM & Monitoring", items: [["ELK Stack", "/tools/elk-stack"],["Wazuh", "/tools/wazuh"],["OSSEC", "/tools/ossec"]] },
  { title: "Cryptography & PKI", items: [["OpenSSL", "/tools/openssl"],["HashiCorp Vault", "/tools/vault"],["Let's Encrypt", "/tools/lets-encrypt"]] },
];

function MenuCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="min-w-[12rem]">
      <h4 className="text-xs uppercase tracking-wide text-emerald-400 mb-1">{title}</h4>
      <ul className="space-y-1 text-sm">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SecondaryNav() {
  return (
    <div className="hidden md:block sticky top-16 z-40 border-t border-b border-slate-800 bg-slate-900/95 backdrop-blur shadow-sm" data-testid="secondary-nav" aria-label="Secondary navigation">
      <div className="mx-auto max-w-6xl px-4 h-11 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        {secondaryLinks.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="px-3 py-1.5 rounded-md text-slate-100 hover:text-emerald-400 hover:bg-slate-800 border border-transparent hover:border-emerald-700 transition text-sm whitespace-nowrap underline-offset-4 hover:underline"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = () => setMobileOpen(v => !v);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-600 bg-slate-900/95 backdrop-blur shadow-sm overflow-visible" data-testid="navbar">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-4">
        <a
          href="/"
          className="group flex h-full shrink-0 items-center gap-3 text-slate-100 transition hover:text-slate-100"
          data-testid="brand"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800/70 ring-1 ring-emerald-500/50 transition group-hover:ring-emerald-400/70">
            <Image
              src="/logo-ironcodex.svg"
              alt="Iron Codex logo"
              width={48}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </span>
          <span className="flex flex-col leading-tight text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-100 group-hover:text-emerald-300">
              IRON-CODEX
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.5em] text-emerald-400">
              CYBERSECURITY
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden md:flex items-center gap-2 overflow-visible" aria-label="Main">
          {/* Topics mega-menu - FIXED: Added hover bridge */}
          <div className="relative group focus-within:visible" data-testid="topics-menu">
            <a href="/topics" className="px-3 h-9 inline-flex items-center rounded-md text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition underline-offset-4 hover:underline" aria-haspopup="true" aria-expanded="false">Topics</a>
            {/* Invisible hover bridge */}
            <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full h-2 w-full z-[59]"></div>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition absolute left-1/2 -translate-x-1/2 mt-2 z-[60] w-[820px] max-w-[95vw] px-2 sm:px-0 rounded-xl border border-slate-700 bg-slate-800 shadow-xl ring-1 ring-slate-700 p-4 grid grid-cols-2 sm:grid-cols-4 gap-5">
              <MenuCol title="Fundamentals" items={[["Security Fundamentals","/topics/security-fundamentals/intro"],["Identity & Access","/topics/identity-access-management/intro"],["Cryptography","/topics/cryptography/intro"],["Risk Management","/topics/governance-risk-compliance/intro"]]} />
              <MenuCol title="Network & Infra" items={[["Network Security","/topics/network-security/intro"],["Cloud Security","/topics/cloud-security/intro"],["Endpoint Security","/topics/endpoint-security/intro"],["Supply Chain","/topics/supply-chain-security/intro"]]} />
              <MenuCol title="AppSec" items={[["Application Security","/topics/application-security/intro"],["API Security","/topics/api-security/intro"],["Threat Modeling","/topics/threat-modeling/intro"],["Vulnerability Mgmt","/topics/vulnerability-management/intro"]]} />
              <MenuCol title="Governance" items={[["RMF / NIST 800-53","/topics/governance-risk-compliance/intro"],["ISO 27001","/topics/compliance-audit/intro"],["SOC 2","/topics/compliance-audit/intro"],["FedRAMP","/topics/governance-risk-compliance/intro"]]} />
            </div>
          </div>

          {/* Guides dropdown - FIXED: Added hover bridge */}
          <div className="relative group focus-within:visible">
            <a href="/guides" className="px-3 h-9 inline-flex items-center rounded-md text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition underline-offset-4 hover:underline" aria-haspopup="true" aria-expanded="false">Guides</a>
            {/* Invisible hover bridge */}
            <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full h-2 w-full z-[59]"></div>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition absolute left-1/2 -translate-x-1/2 mt-2 z-[60] w-[360px] max-w-[95vw] px-2 sm:px-0 rounded-xl border border-slate-700 bg-slate-800 shadow-xl ring-1 ring-slate-700 p-3 grid grid-cols-1 gap-1">
              <Link href="/guides/api-security/intro" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Deep Dive: API Security</Link>
              <Link href="/guides/cloud-security/intro" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Cloud Hardening</Link>
              <Link href="/guides/saas-security/intro" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Vendor/SaaS Reviews</Link>
              <Link href="/guides/incident-response/intro" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Incident Response</Link>
              <Link href="/topics/zero-trust/intro" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Zero Trust</Link>
            </div>
          </div>

          {/* Tools dropdown - FIXED: Added hover bridge */}
          <div className="relative group focus-within:visible">
            <a href="/tools" className="px-3 h-9 inline-flex items-center rounded-md text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition underline-offset-4 hover:underline" aria-haspopup="true" aria-expanded="false">Tools</a>
            {/* Invisible hover bridge */}
            <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full h-2 w-full z-[59]"></div>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition absolute left-1/2 -translate-x-1/2 mt-2 z-[60] w-[820px] max-w-[95vw] px-2 sm:px-0 rounded-xl border border-slate-700 bg-slate-800 shadow-xl ring-1 ring-slate-700 p-4 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {toolsCategories.map((cat) => (<MenuCol key={cat.title} title={cat.title} items={cat.items} />))}
            </div>
          </div>

          <a href="/about" className="px-3 h-9 inline-flex items-center rounded-md text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition underline-offset-4 hover:underline">About</a>

          {/* Global search */}
          <form action="/topics" className="ml-2 flex items-center gap-2" role="search" data-testid="header-search">
            <input name="q" type="search" placeholder="Search Iron Codex" className="h-9 w-56 rounded-md border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-400 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500" />
            <button className="h-9 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition">Search</button>
          </form>
        </nav>

        {/* Mobile trigger */}
        <button onClick={toggle} className="ml-auto md:hidden h-9 px-3 rounded-md border border-slate-700 shadow-sm active:scale-[.98] transition text-slate-100" aria-expanded={mobileOpen} aria-controls="mobile-menu">Menu</button>
      </div>

      <SecondaryNav />

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-700 bg-slate-800">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">
            <a href="/topics" className="block text-emerald-400">Topics</a>
            <a href="/guides" className="block text-emerald-400">Guides</a>
            <a href="/tools" className="block text-emerald-400">Tools</a>
            <a href="/about" className="block text-emerald-400">About</a>
            <div className="pt-3 border-t border-slate-700">
              <div className="flex flex-wrap gap-2">
                {secondaryLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-3 py-1 rounded-md border border-slate-700 text-slate-200 hover:text-emerald-400 hover:border-emerald-600 text-sm"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}