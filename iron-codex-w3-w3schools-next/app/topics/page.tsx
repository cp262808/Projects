'use client';
import React from "react";
import Link from "next/link";

const allTopics = [
  {
    title: "Security Fundamentals",
    slug: "security-fundamentals",
    description: "Core security principles, governance frameworks, and foundational concepts every security professional should know.",
    level: "Beginner",
    controls: 24,
    category: "Fundamentals"
  },
  {
    title: "Identity & Access Management", 
    slug: "identity-access",
    description: "Authentication, authorization, SSO, privileged access management, and identity governance.",
    level: "Intermediate",
    controls: 32,
    category: "Fundamentals"
  },
  {
    title: "Application Security",
    slug: "appsec", 
    description: "SAST, DAST, secure coding practices, vulnerability management, and application security testing.",
    level: "Intermediate",
    controls: 28,
    category: "AppSec"
  },
  {
    title: "API Security",
    slug: "api-security",
    description: "API authentication, rate limiting, input validation, and protection against OWASP API Top 10.",
    level: "Intermediate", 
    controls: 22,
    category: "AppSec"
  },
  {
    title: "Cloud Security",
    slug: "cloud-security",
    description: "AWS, Azure, GCP security controls, cloud-native security, and multi-cloud governance.",
    level: "Advanced",
    controls: 45,
    category: "Infrastructure"
  },
  {
    title: "Network Security",
    slug: "network-security", 
    description: "Firewalls, IDS/IPS, network segmentation, VPNs, and network monitoring.",
    level: "Intermediate",
    controls: 35,
    category: "Infrastructure"
  },
  {
    title: "Endpoint Security",
    slug: "endpoints",
    description: "EDR, antivirus, device encryption, patch management, and BYOD security.",
    level: "Beginner",
    controls: 16,
    category: "Infrastructure"
  },
  {
    title: "Container Security", 
    slug: "containers",
    description: "Docker, Kubernetes security, image scanning, runtime protection, and container hardening.",
    level: "Advanced",
    controls: 38,
    category: "Infrastructure"
  },
  {
    title: "Cryptography",
    slug: "cryptography",
    description: "Encryption algorithms, key management, PKI, digital signatures, and cryptographic protocols.",
    level: "Advanced", 
    controls: 20,
    category: "Fundamentals"
  },
  {
    title: "Risk Management",
    slug: "risk-management",
    description: "Risk assessment, business impact analysis, third-party risk, and security metrics.",
    level: "Intermediate",
    controls: 18,
    category: "Governance"
  },
  {
    title: "Compliance & Governance",
    slug: "compliance",
    description: "SOC 2, ISO 27001, NIST frameworks, audit preparation, and regulatory compliance.",
    level: "Advanced",
    controls: 42,
    category: "Governance"
  },
  {
    title: "Incident Response",
    slug: "incident-response", 
    description: "Incident handling procedures, forensics, threat hunting, and crisis management.",
    level: "Advanced",
    controls: 25,
    category: "Operations"
  }
];

const categories = ["All", "Fundamentals", "AppSec", "Infrastructure", "Governance", "Operations"];

export default function TopicsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const filteredTopics = selectedCategory === "All" 
    ? allTopics 
    : allTopics.filter(topic => topic.category === selectedCategory);

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Security Topics
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Comprehensive coverage of cybersecurity domains with practical controls and implementation guidance.
            </p>
            
            {/* Search */}
            <form action="/search" role="search" className="mt-6 flex w-full max-w-xl gap-2">
              <input
                name="q"
                type="search"
                aria-label="Search topics"
                placeholder="Search security topics..."
                className="h-11 flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              />
              <button className="h-11 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Category Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{allTopics.length}</div>
            <div className="text-sm text-slate-400">Topics</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{allTopics.reduce((sum, topic) => sum + topic.controls, 0)}</div>
            <div className="text-sm text-slate-400">Total Controls</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{categories.length - 1}</div>
            <div className="text-sm text-slate-400">Categories</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-sm text-slate-400">Practical</div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                  {topic.title}
                </h2>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  topic.level === 'Beginner' ? 'bg-green-900 text-green-200' :
                  topic.level === 'Intermediate' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-red-900 text-red-200'
                }`}>
                  {topic.level}
                </span>
              </div>
              <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                {topic.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-400">
                  {topic.controls} controls
                </span>
                <span className="text-emerald-400 group-hover:translate-x-2 transition-transform text-sm">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.</p>
      </footer>
    </main>
  );
}