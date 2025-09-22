'use client';
import React from "react";
import { PromoBadge, PromoFlare } from "./PromoFlare";

/** Iron Codex Landing (clean, W3-style utility-first, less flashy)
 *  - Hero with primary search
 *  - Quick Access tiles
 *  - Topic index sections (match secondary bar)
 *  - Tools spotlight
 */

const quickLinks: { label: string; eyebrow: string; k: string }[] = [
  { label: "Security Fundamentals", eyebrow: "Preview Track", k: "fundamentals" },
  { label: "AppSec", eyebrow: "Preview Track", k: "appsec" },
  { label: "API Security", eyebrow: "Guide Sneak Peek", k: "api" },
  { label: "Cloud Security", eyebrow: "Preview Track", k: "cloud" },
  { label: "Network Security", eyebrow: "Preview Track", k: "network" },
  { label: "Identity & Access", eyebrow: "Preview Track", k: "iam" },
];

const topicBuckets: { title: string; items: { label: string; eyebrow?: string }[] }[] = [
  {
    title: "Fundamentals",
    items: [
      { label: "Security Fundamentals", eyebrow: "Curriculum" },
      { label: "Identity & Access", eyebrow: "Curriculum" },
      { label: "Cryptography", eyebrow: "Curriculum" },
      { label: "Risk Management", eyebrow: "Curriculum" },
    ],
  },
  {
    title: "Network & Infra",
    items: [
      { label: "Network Security", eyebrow: "Curriculum" },
      { label: "Cloud Security", eyebrow: "Curriculum" },
      { label: "Endpoint Security", eyebrow: "Curriculum" },
      { label: "Supply Chain", eyebrow: "Curriculum" },
    ],
  },
  {
    title: "AppSec",
    items: [
      { label: "Application Security", eyebrow: "Curriculum" },
      { label: "API Security", eyebrow: "Curriculum" },
      { label: "Threat Modeling", eyebrow: "Curriculum" },
      { label: "Vulnerability Mgmt", eyebrow: "Curriculum" },
    ],
  },
  {
    title: "Governance",
    items: [
      { label: "RMF / NIST 800-53", eyebrow: "Curriculum" },
      { label: "ISO 27001", eyebrow: "Curriculum" },
      { label: "SOC 2", eyebrow: "Curriculum" },
      { label: "FedRAMP", eyebrow: "Curriculum" },
    ],
  },
];

const toolsSpotlight = [
  { label: "Nmap", eyebrow: "Lab Preview" },
  { label: "Burp Suite", eyebrow: "Lab Preview" },
  { label: "Wireshark", eyebrow: "Lab Preview" },
  { label: "Trivy", eyebrow: "Lab Preview" },
  { label: "Prowler", eyebrow: "Lab Preview" },
  { label: "HashiCorp Vault", eyebrow: "Lab Preview" },
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
                  <PromoFlare
                    key={q.k}
                    label={q.label}
                    eyebrow={q.eyebrow}
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
            <div key={b.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm uppercase tracking-wide text-emerald-400 mb-2">{b.title}</h3>
              <ul className="space-y-2 text-sm">
                {b.items.map((it) => (
                  <li key={it.label}>
                    <PromoFlare label={it.label} eyebrow={it.eyebrow ?? "Curriculum"} size="sm" />
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
            <PromoBadge label="Full catalog in preview" tone="active" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {toolsSpotlight.map((t) => (
              <PromoFlare
                key={t.label}
                label={t.label}
                eyebrow={t.eyebrow}
                size="sm"
                align="center"
              />
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
