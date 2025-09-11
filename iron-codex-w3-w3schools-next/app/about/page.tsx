'use client';
import React from "react";
import Link from "next/link";

const teamValues = [
  {
    title: "Practical First",
    description: "Every piece of content must be immediately actionable and applicable to real-world security challenges."
  },
  {
    title: "No Fluff",
    description: "We focus on implementation details and skip the theoretical background that doesn't help practitioners."
  },
  {
    title: "Community Driven", 
    description: "Our content is shaped by feedback from security professionals working in the field every day."
  },
  {
    title: "Always Current",
    description: "We continuously update our guidance to reflect the latest threats, tools, and best practices."
  }
];

const stats = [
  { number: "12", label: "Core Topics", description: "Covering all major security domains" },
  { number: "8", label: "Deep Guides", description: "Comprehensive implementation guides" },
  { number: "32+", label: "Security Tools", description: "Vetted tools with practical guidance" },
  { number: "350+", label: "Security Controls", description: "Actionable controls across all topics" }
];

export default function AboutPage() {
  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              About Iron Codex
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Building practical cybersecurity knowledge for security professionals worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <div className="prose prose-lg prose-slate prose-invert">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Iron Codex provides practical, actionable cybersecurity guidance in a format similar to W3Schools. 
              We bridge the gap between theoretical security knowledge and real-world implementation by focusing 
              on practical controls that security professionals can immediately apply in their environments.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              Too many cybersecurity resources focus on high-level concepts without providing the practical 
              implementation details needed to actually secure systems. We're changing that by creating 
              comprehensive, step-by-step guidance that works in the real world.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold mb-8">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {teamValues.map((value) => (
            <div key={value.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-3">
                {value.title}
              </h3>
              <p className="text-slate-300">
                {value.description}
              </p>
            </div>
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