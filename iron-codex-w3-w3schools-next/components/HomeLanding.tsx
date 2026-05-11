'use client';
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const stats = [
  { value: 350, suffix: "+", label: "Security Controls" },
  { value: 22, suffix: "+", label: "Technology Areas" },
  { value: 100, suffix: "+", label: "Implementation Examples" },
  { value: 32, suffix: "+", label: "Security Tools" },
];

const topicCards: {
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  controls: number;
}[] = [
  {
    title: "Security Fundamentals",
    slug: "security-fundamentals",
    description: "Core principles, governance, and foundational concepts.",
    icon: "🛡️",
    color: "from-emerald-500/20 to-emerald-800/10",
    controls: 24,
  },
  {
    title: "API Security",
    slug: "api-security",
    description: "JWT, OAuth, rate limiting, and OWASP API Top 10.",
    icon: "🔐",
    color: "from-cyan-500/20 to-cyan-800/10",
    controls: 22,
  },
  {
    title: "Cloud Security",
    slug: "cloud-security",
    description: "AWS, Azure, GCP controls and multi-cloud governance.",
    icon: "☁️",
    color: "from-blue-500/20 to-blue-800/10",
    controls: 45,
  },
  {
    title: "Identity & Access",
    slug: "identity-access-management",
    description: "SSO, MFA, RBAC, and privileged access management.",
    icon: "🔑",
    color: "from-violet-500/20 to-violet-800/10",
    controls: 32,
  },
  {
    title: "Network Security",
    slug: "network-security",
    description: "Firewalls, IDS/IPS, segmentation, and VPNs.",
    icon: "🌐",
    color: "from-orange-500/20 to-orange-800/10",
    controls: 35,
  },
  {
    title: "Container Security",
    slug: "container-security",
    description: "Docker, Kubernetes, image scanning, and runtime protection.",
    icon: "📦",
    color: "from-pink-500/20 to-pink-800/10",
    controls: 38,
  },
  {
    title: "Cryptography",
    slug: "cryptography",
    description: "Encryption, key management, PKI, and protocols.",
    icon: "🔒",
    color: "from-amber-500/20 to-amber-800/10",
    controls: 20,
  },
  {
    title: "Incident Response",
    slug: "incident-response",
    description: "Handling procedures, forensics, and crisis management.",
    icon: "🚨",
    color: "from-red-500/20 to-red-800/10",
    controls: 25,
  },
];

const featuredGuides: {
  title: string;
  slug: string;
  readTime: string;
  category: string;
  level: string;
}[] = [
  { title: "Deep Dive: API Security", slug: "api-security", readTime: "25 min", category: "Application Security", level: "Intermediate" },
  { title: "Cloud Hardening", slug: "cloud-security", readTime: "35 min", category: "Cloud Security", level: "Advanced" },
  { title: "Container Security Deep Dive", slug: "containers", readTime: "30 min", category: "Infrastructure", level: "Advanced" },
  { title: "Vendor Security Assessments", slug: "saas-security", readTime: "20 min", category: "Risk Management", level: "Intermediate" },
  { title: "Incident Response Playbook", slug: "incident-response", readTime: "40 min", category: "Operations", level: "Advanced" },
  { title: "Zero Trust Architecture", slug: "zero-trust", readTime: "45 min", category: "Architecture", level: "Advanced" },
];

const toolsHighlight = [
  { name: "Nmap", category: "Recon" },
  { name: "Burp Suite", category: "AppSec" },
  { name: "Wireshark", category: "Network" },
  { name: "Trivy", category: "Containers" },
  { name: "Prowler", category: "Cloud" },
  { name: "Vault", category: "Secrets" },
];

/* ═══════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════ */

/** Animate a number counting up when element enters viewport */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { ref, count };
}

/** Trigger `is-visible` class when element scrolls into view */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

/* ═══════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════ */

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-emerald-400 tabular-nums">
        {count}
        <span className="text-emerald-300">{suffix}</span>
      </div>
      <div className="mt-1 text-sm text-slate-400 font-medium">{label}</div>
    </div>
  );
}

function TopicCard({
  title,
  slug,
  description,
  icon,
  color,
  controls,
  index,
}: {
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  controls: number;
  index: number;
}) {
  return (
    <Link
      href={`/topics/${slug}/intro`}
      className={`group relative rounded-2xl border border-slate-800 bg-gradient-to-br ${color} p-6 hover-card block stagger-${Math.min(index + 1, 6)}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl" role="img" aria-hidden="true">{icon}</span>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-0.5">
          {controls} controls
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-emerald-300 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>
      <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Explore topic
        <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </Link>
  );
}

function GuideCard({
  title,
  slug,
  readTime,
  category,
  level,
}: {
  title: string;
  slug: string;
  readTime: string;
  category: string;
  level: string;
}) {
  const levelColors: Record<string, string> = {
    Intermediate: "bg-yellow-900/50 border-yellow-500/40 text-yellow-200",
    Advanced: "bg-red-900/50 border-red-500/40 text-red-200",
    Beginner: "bg-green-900/50 border-green-500/40 text-green-200",
  };
  return (
    <Link
      href={`/guides/${slug}/intro`}
      className="group flex-shrink-0 w-72 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover-card block"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 border ${levelColors[level] || levelColors.Intermediate}`}>
          {level}
        </span>
        <span className="text-xs text-slate-500">{readTime} read</span>
      </div>
      <h3 className="font-bold text-slate-100 mb-1 group-hover:text-emerald-300 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-emerald-400 font-medium">{category}</p>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function HomeLanding() {
  const heroRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const topicsRef = useScrollReveal();
  const guidesRef = useScrollReveal();
  const toolsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── Hero ── */}
      <section className="cyber-grid border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div ref={heroRef} className="scroll-animate mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-dotPulse" />
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Open-source cybersecurity knowledge
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Learn{" "}
              <span className="gradient-text">Cybersecurity</span>
              <br />
              the Practical Way
            </h1>

            <p className="mt-5 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Concise, actionable security references structured like W3Schools.
              From fundamentals to advanced controls — start building secure systems today.
            </p>

            <form action="/search" role="search" className="mt-8 flex w-full max-w-xl gap-2">
              <input
                name="q"
                type="search"
                aria-label="Search Iron Codex"
                placeholder="Search topics, guides, tools…"
                className="h-12 flex-1 rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
              <button className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30">
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/topics"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-300 transition font-medium text-sm"
              >
                Browse All Topics →
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition font-medium text-sm"
              >
                Deep Dive Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-slate-800 bg-slate-900/40">
        <div ref={statsRef} className="scroll-animate mx-auto max-w-6xl px-4 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics Grid ── */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div ref={topicsRef} className="scroll-animate">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Explore Security Topics</h2>
              <p className="mt-2 text-slate-400">Practical controls across every major domain.</p>
            </div>
            <Link href="/topics" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition">
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topicCards.map((topic, i) => (
              <TopicCard key={topic.slug} {...topic} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Guides ── */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div ref={guidesRef} className="scroll-animate mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Deep Dive Guides</h2>
              <p className="mt-2 text-slate-400">Comprehensive, step-by-step implementation guides.</p>
            </div>
            <Link href="/guides" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition">
              All guides
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} {...guide} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Spotlight ── */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div ref={toolsRef} className="scroll-animate">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Popular Tools</h2>
              <p className="mt-2 text-slate-400">Vetted security tools with practical guidance.</p>
            </div>
            <Link href="/tools" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition">
              Full catalog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {toolsHighlight.map((tool) => (
              <Link
                key={tool.name}
                href="/tools"
                className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center hover-card block"
              >
                <div className="font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                  {tool.name}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-1">
                  {tool.category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-800">
        <div ref={ctaRef} className="scroll-animate mx-auto max-w-6xl px-4 py-20">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 p-10 md:p-14 text-center animate-glowPulse">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Level Up Your Security?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Start with the fundamentals or jump straight into an advanced guide.
              All content is free and open-source.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/topics/security-fundamentals/intro"
                className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30"
              >
                Start Learning
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 rounded-xl border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 font-semibold transition"
              >
                About the Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
