'use client';
import React from "react";
import Link from "next/link";

/** Iron Codex Landing (clean, W3-style utility-first, less flashy)
 *  - Hero with primary search
 *  - Quick Access tiles
 *  - Topic index sections (match secondary bar)
 *  - Tools spotlight
 */

const quickLinks: { label: string; href: string; k: string }[] = [
  { label: "Security Fundamentals", href: "/topics/security-fundamentals", k: "fundamentals" },
  { label: "AppSec", href: "/topics/application-security", k: "appsec" },
  { label: "API Security", href: "/guides/api-security", k: "api" },
  { label: "Cloud Security", href: "/topics/cloud-security", k: "cloud" },
  { label: "Network Security", href: "/topics/network-security", k: "network" },
  { label: "Identity & Access", href: "/topics/identity-access-management", k: "iam" },
];

const topicBuckets: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Fundamentals",
    items: [
      { label: "Security Fundamentals", href: "/topics/security-fundamentals" },
      { label: "Identity & Access", href: "/topics/identity-access-management" },
      { label: "Cryptography", href: "/topics/cryptography" },
      { label: "Risk Management", href: "/topics/governance-risk-compliance" },
    ],
  },
  {
    title: "Network & Infra",
    items: [
      { label: "Network Security", href: "/topics/network-security" },
      { label: "Cloud Security", href: "/topics/cloud-security" },
      { label: "Endpoint Security", href: "/topics/endpoint-security" },
      { label: "Supply Chain", href: "/topics/supply-chain-security" },
    ],
  },
  {
    title: "AppSec",
    items: [
      { label: "Application Security", href: "/topics/application-security" },
      { label: "API Security", href: "/topics/api-security" },
      { label: "Threat Modeling", href: "/topics/threat-modeling" },
      { label: "Vulnerability Mgmt", href: "/topics/vulnerability-management" },
    ],
  },
  {
    title: "Governance",
    items: [
      { label: "RMF / NIST 800-53", href: "/topics/rmf-800-53" },
      { label: "ISO 27001", href: "/topics/iso-27001" },
      { label: "SOC 2", href: "/topics/soc2" },
      { label: "FedRAMP", href: "/topics/fedramp" },
    ],
  },
];

const toolsSpotlight = [
  { label: "Nmap", href: "/tools/nmap" },
  { label: "Burp Suite", href: "/tools/burp-suite" },
  { label: "Wireshark", href: "/tools/wireshark" },
  { label: "Trivy", href: "/tools/trivy" },
  { label: "Prowler", href: "/tools/prowler" },
  { label: "HashiCorp Vault", href: "/tools/vault" },
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
              <form action="/topics" role="search" className="mt-6 flex w-full max-w-xl gap-2">
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
                  <Link
                    key={q.k}
                    href={q.href}
                    className="rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 px-4 py-3 text-slate-100 hover:text-emerald-400 transition text-sm text-center"
                  >
                    {q.label}
                  </Link>
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
            <div key={b.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm uppercase tracking-wide text-emerald-400 mb-2">{b.title}</h3>
              <ul className="space-y-1 text-sm">
                {b.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="text-slate-200 hover:text-emerald-400">
                      {it.label}
                    </Link>
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
            <Link href="/tools" className="text-sm text-emerald-400 hover:underline underline-offset-4">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {toolsSpotlight.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-slate-200 hover:text-emerald-400 hover:border-emerald-600 transition text-sm"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex.</p>
      </footer>
    </main>
  );
}
