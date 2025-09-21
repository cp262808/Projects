'use client';
import React from "react";

export default function MapsPage() {
  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Security Maps
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Visual roadmaps and learning paths for cybersecurity professionals at every stage of their career.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            We&rsquo;re creating interactive learning maps that will guide you through cybersecurity topics
            based on your experience level and career goals.
          </p>
          
          {/* Placeholder Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="font-semibold text-emerald-400 mb-2">Career Paths</h3>
              <p className="text-sm text-slate-300">
                Structured learning paths for different cybersecurity roles and specializations.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-2xl mb-3">📈</div>
              <h3 className="font-semibold text-emerald-400 mb-2">Skill Progression</h3>
              <p className="text-sm text-slate-300">
                Visual progression maps showing how to advance from beginner to expert.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-2xl mb-3">🏆</div>
              <h3 className="font-semibold text-emerald-400 mb-2">Certification Prep</h3>
              <p className="text-sm text-slate-300">
                Guided paths for popular cybersecurity certifications and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.</p>
      </footer>
    </main>
  );
}