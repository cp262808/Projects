'use client';
import React from "react";
import Link from "next/link";

const allGuides = [
  {
    title: "Deep Dive: API Security",
    slug: "api-security",
    description: "Comprehensive guide to securing APIs including authentication, authorization, rate limiting, and protection against OWASP API Top 10 vulnerabilities.",
    category: "Application Security",
    readTime: "25 min",
    level: "Intermediate",
    topics: ["Authentication", "Rate Limiting", "Input Validation", "OWASP API Top 10"]
  },
  {
    title: "Cloud Security Hardening",
    slug: "cloud-hardening", 
    description: "Step-by-step hardening guide for AWS, Azure, and GCP environments including IAM, network security, and monitoring configurations.",
    category: "Cloud Security",
    readTime: "35 min", 
    level: "Advanced",
    topics: ["AWS Security", "Azure Security", "GCP Security", "IAM Hardening"]
  },
  {
    title: "Container Security Deep Dive",
    slug: "containers",
    description: "Complete guide to securing Docker containers and Kubernetes clusters, from image scanning to runtime protection.",
    category: "Infrastructure",
    readTime: "30 min",
    level: "Advanced", 
    topics: ["Docker Security", "Kubernetes", "Image Scanning", "Runtime Protection"]
  },
  {
    title: "Vendor Security Assessments",
    slug: "vendor-security",
    description: "Framework for evaluating third-party vendors and SaaS providers including security questionnaires and risk assessment methodologies.",
    category: "Risk Management",
    readTime: "20 min",
    level: "Intermediate",
    topics: ["Third-party Risk", "SaaS Security", "Vendor Assessments", "Due Diligence"]
  },
  {
    title: "Incident Response Playbook",
    slug: "incident-response",
    description: "Practical incident response procedures covering detection, containment, eradication, recovery, and lessons learned.",
    category: "Operations",
    readTime: "40 min",
    level: "Advanced",
    topics: ["IR Procedures", "Forensics", "Communication", "Post-Incident Analysis"]
  },
  {
    title: "Zero Trust Architecture",
    slug: "zero-trust",
    description: "Implementation guide for Zero Trust security model including network microsegmentation, identity verification, and least privilege access.",
    category: "Architecture", 
    readTime: "45 min",
    level: "Advanced",
    topics: ["Zero Trust", "Microsegmentation", "Identity Verification", "Least Privilege"]
  },
  {
    title: "Threat Modeling Methodology",
    slug: "threat-modeling",
    description: "Systematic approach to identifying and mitigating security threats using STRIDE, DREAD, and other proven methodologies.",
    category: "Application Security",
    readTime: "30 min",
    level: "Intermediate", 
    topics: ["STRIDE", "DREAD", "Attack Trees", "Threat Analysis"]
  },
  {
    title: "DevSecOps Implementation",
    slug: "devsecops",
    description: "Integrating security into CI/CD pipelines with automated testing, vulnerability scanning, and security gates.",
    category: "Development",
    readTime: "35 min",
    level: "Intermediate",
    topics: ["CI/CD Security", "SAST/DAST", "Security Gates", "Automation"]
  }
];

const categories = ["All", "Application Security", "Cloud Security", "Infrastructure", "Risk Management", "Operations", "Architecture", "Development"];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const filteredGuides = selectedCategory === "All" 
    ? allGuides 
    : allGuides.filter(guide => guide.category === selectedCategory);

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Deep Dive Guides
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Comprehensive implementation guides for complex security topics with step-by-step instructions and real-world examples.
            </p>
            
            {/* Search */}
            <form action="/search" role="search" className="mt-6 flex w-full max-w-xl gap-2">
              <input
                name="q"
                type="search"
                aria-label="Search guides"
                placeholder="Search security guides..."
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
            <div className="text-2xl font-bold text-emerald-400">{allGuides.length}</div>
            <div className="text-sm text-slate-400">Guides</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{Math.round(allGuides.reduce((sum, guide) => sum + parseInt(guide.readTime), 0) / allGuides.length)}</div>
            <div className="text-sm text-slate-400">Avg Read Time</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{categories.length - 1}</div>
            <div className="text-sm text-slate-400">Categories</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-sm text-slate-400">Actionable</div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="space-y-6">
          {filteredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                      {guide.title}
                    </h2>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      guide.level === 'Beginner' ? 'bg-green-900 text-green-200' :
                      guide.level === 'Intermediate' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-red-900 text-red-200'
                    }`}>
                      {guide.level}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {guide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {guide.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 text-right">
                  <div className="text-sm text-emerald-400 font-medium">
                    {guide.category}
                  </div>
                  <div className="text-sm text-slate-400">
                    {guide.readTime} read
                  </div>
                  <div className="text-emerald-400 group-hover:translate-x-2 transition-transform text-sm">
                    Read guide →
                  </div>
                </div>
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