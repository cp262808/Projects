import React from "react";
import { PromoBadge, PromoFlare } from "./PromoFlare";

/** Iron Codex Landing
 *  - Hero with primary search
 *  - Quick Access tiles (now clickable)
 *  - Topic index sections
 *  - Tools spotlight
 */

const quickLinks: { label: string; eyebrow: string; k: string; href: string }[] = [
  { label: "Security Fundamentals", eyebrow: "Curriculum", k: "fundamentals", href: "/topics/security-fundamentals/intro" },
  { label: "AppSec", eyebrow: "Curriculum", k: "appsec", href: "/topics/application-security/intro" },
  { label: "API Security", eyebrow: "Guide", k: "api", href: "/guides/api-security/intro" },
  { label: "Cloud Security", eyebrow: "Curriculum", k: "cloud", href: "/topics/cloud-security/intro" },
  { label: "Network Security", eyebrow: "Curriculum", k: "network", href: "/topics/network-security/intro" },
  { label: "Identity & Access", eyebrow: "Curriculum", k: "iam", href: "/topics/identity-access-management/intro" },
];

const topicBuckets: { title: string; items: { label: string; eyebrow?: string; href: string }[] }[] = [
  {
    title: "Fundamentals",
    items: [
      { label: "Security Fundamentals", href: "/topics/security-fundamentals/intro" },
      { label: "Identity & Access", href: "/topics/identity-access-management/intro" },
      { label: "Cryptography", href: "/topics/cryptography/intro" },
      { label: "Risk Management", href: "/topics/governance-risk-compliance/intro" },
    ],
  },
  {
    title: "Network & Infra",
    items: [
      { label: "Network Security", href: "/topics/network-security/intro" },
      { label: "Cloud Security", href: "/topics/cloud-security/intro" },
      { label: "Endpoint Security", href: "/topics/endpoint-security/intro" },
      { label: "Supply Chain", href: "/topics/supply-chain-security/intro" },
    ],
  },
  {
    title: "AppSec",
    items: [
      { label: "Application Security", href: "/topics/application-security/intro" },
      { label: "API Security", href: "/topics/api-security/intro" },
      { label: "Threat Modeling", href: "/topics/threat-modeling/intro" },
      { label: "Vulnerability Mgmt", href: "/topics/vulnerability-management/intro" },
    ],
  },
  {
    title: "Governance",
    items: [
      { label: "RMF / NIST 800-53", href: "/topics/governance-risk-compliance/intro" },
      { label: "ISO 27001", href: "/topics/compliance-audit/intro" },
      { label: "SOC 2", href: "/topics/compliance-audit/intro" },
      { label: "FedRAMP", href: "/topics/governance-risk-compliance/intro" },
    ],
  },
];

const toolsSpotlight: { label: string; eyebrow: string; href: string }[] = [
  { label: "Nmap", eyebrow: "Tool", href: "/tools/nmap" },
  { label: "Burp Suite", eyebrow: "Tool", href: "/tools/burp-suite" },
  { label: "Wireshark", eyebrow: "Tool", href: "/tools/wireshark" },
  { label: "Trivy", eyebrow: "Tool", href: "/tools/trivy" },
  { label: "Prowler", eyebrow: "Tool", href: "/tools/prowler" },
  { label: "HashiCorp Vault", eyebrow: "Tool", href: "/tools/vault" },
];

export default function HomeLanding() {
  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex items-start md:items-center justify-between gap-8 flex-col md:flex-row">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Iron Codex — Practical Cybersecurity Knowledge
              </h1>
              <p className="mt-3 text-slate-300">
                Concise, actionable references. W3Schools structure. Security depth.
              </p>
              <form action="/search" role="search" className="mt-6 flex w-full max-w-xl gap-2">
                <input
                  name="q"
                  type="search"
                  aria-label="Search Iron Codex"
                  placeholder="Search topics, guides, tools"
                  className="h-11 flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                />
                <button className="h-11 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white">
                  Search
                </button>
              </form>
            </div>
            <div className="w-full md:w-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickLinks.map((q) => (
                  <PromoFlare
                    key={q.k}
                    label={q.label}
                    eyebrow={q.eyebrow}
                    href={q.href}
                    size="lg"
                    align="center"
                    className="h-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics index */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-xl font-semibold mb-6">Browse Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {topicBuckets.map((b) => (
            <div key={b.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)] hover:-translate-y-0.5">
              <h3 className="text-sm uppercase tracking-wide text-emerald-400 mb-2">{b.title}</h3>
              <ul className="space-y-2 text-sm">
                {b.items.map((it) => (
                  <li key={it.label}>
                    <PromoFlare label={it.label} eyebrow={it.eyebrow ?? "Curriculum"} href={it.href} size="sm" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tools spotlight */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Popular Tools</h2>
            <PromoBadge label="View all tools" tone="active" href="/tools" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {toolsSpotlight.map((t) => (
              <PromoFlare
                key={t.label}
                label={t.label}
                eyebrow={t.eyebrow}
                href={t.href}
                size="sm"
                align="center"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
