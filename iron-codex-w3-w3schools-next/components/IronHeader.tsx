'use client';
import React, { useState } from "react";

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
  ["Incident Response", "/guides/incident-response"],
  ["Vendor Reviews", "/guides/vendor-security"],
  ["SaaS Security", "/topics/saas-security/intro"],
  ["Crypto & Key Mgmt", "/topics/cryptography/intro"],
  ["Logging & Monitoring", "/topics/logging-and-monitoring/intro"],
  ["GenAI Security", "/topics/genai-security/intro"],
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
            <a href={href} className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition">{label}</a>
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
          <a key={href} href={href} className="px-3 py-1.5 rounded-md text-slate-100 hover:text-emerald-400 hover:bg-slate-800 border border-transparent hover:border-emerald-700 transition text-sm whitespace-nowrap underline-offset-4 hover:underline">{label}</a>
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
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-3">
        <a href="/" className="font-bold flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition underline-offset-4 hover:underline" data-testid="brand"><span aria-hidden>🛡️</span> <span>Iron Codex</span></a>

        <nav className="ml-auto hidden md:flex items-center gap-2 overflow-visible" aria-label="Main">
          {/* Topics mega-menu - FIXED: Added hover bridge */}
          <div className="relative group focus-within:visible" data-testid="topics-menu">
            <a href="/topics/identity-access-management/intro" className="px-3 h-9 inline-flex items-center rounded-md text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition underline-offset-4 hover:underline" aria-haspopup="true" aria-expanded="false">Topics</a>
            {/* Invisible hover bridge */}
            <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full h-2 w-full z-[59]"></div>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition absolute left-1/2 -translate-x-1/2 mt-2 z-[60] w-[820px] max-w-[95vw] px-2 sm:px-0 rounded-xl border border-slate-700 bg-slate-800 shadow-xl ring-1 ring-slate-700 p-4 grid grid-cols-2 sm:grid-cols-4 gap-5">
              <MenuCol title="Fundamentals" items={[["Security Fundamentals","/topics/security-fundamentals"],["Identity & Access","/topics/identity-access"],["Cryptography","/topics/cryptography"],["Risk Management","/topics/risk-management"]]} />
              <MenuCol title="Network & Infra" items={[["Network Security","/topics/network-security"],["Cloud Security","/topics/cloud-security"],["Endpoint Security","/topics/endpoints"],["Supply Chain","/topics/supply-chain"]]} />
              <MenuCol title="AppSec" items={[["Application Security","/topics/appsec"],["API Security","/topics/api-security"],["Threat Modeling","/topics/threat-modeling"],["Vulnerability Mgmt","/topics/vuln-management"]]} />
              <MenuCol title="Governance" items={[["RMF / NIST 800-53","/topics/rmf-800-53"],["ISO 27001","/topics/iso-27001"],["SOC 2","/topics/soc2"],["FedRAMP","/topics/fedramp"]]} />
            </div>
          </div>

          {/* Guides dropdown - FIXED: Added hover bridge */}
          <div className="relative group focus-within:visible">
            <a href="/topics/api-security/intro" className="px-3 h-9 inline-flex items-center rounded-md text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition underline-offset-4 hover:underline" aria-haspopup="true" aria-expanded="false">Guides</a>
            {/* Invisible hover bridge */}
            <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full h-2 w-full z-[59]"></div>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition absolute left-1/2 -translate-x-1/2 mt-2 z-[60] w-[360px] max-w-[95vw] px-2 sm:px-0 rounded-xl border border-slate-700 bg-slate-800 shadow-xl ring-1 ring-slate-700 p-3 grid grid-cols-1 gap-1">
              <a href="/guides/api-security" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Deep Dive: API Security</a>
              <a href="/guides/cloud-hardening" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Cloud Hardening</a>
              <a href="/guides/vendor-security" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Vendor/SaaS Reviews</a>
              <a href="/guides/incident-response" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Incident Response</a>
              <a href="/guides/zero-trust" className="block px-2 py-1 rounded text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400">Zero Trust</a>
            </div>
          </div>

          {/* Tools dropdown - FIXED: Added hover bridge */}
          <div className="relative group focus-within:visible">
            <a href="/topics/cloud-security/intro" className="px-3 h-9 inline-flex items-center rounded-md text-slate-100 hover:bg-emerald-600/20 hover:text-emerald-400 transition underline-offset-4 hover:underline" aria-haspopup="true" aria-expanded="false">Tools</a>
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
            <a href="/topics/identity-access-management/intro" className="block text-emerald-400">Topics</a>
            <a href="/topics/api-security/intro" className="block text-emerald-400">Guides</a>
            <a href="/topics/cloud-security/intro" className="block text-emerald-400">Tools</a>
            <a href="/about" className="block text-emerald-400">About</a>
            <div className="pt-3 border-t border-slate-700">
              <div className="flex flex-wrap gap-2">
                {secondaryLinks.map(([label, href]) => (<a key={href} href={href} className="px-3 py-1 rounded-md border border-slate-700 text-slate-200 hover:text-emerald-400 hover:border-emerald-600 text-sm">{label}</a>))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}