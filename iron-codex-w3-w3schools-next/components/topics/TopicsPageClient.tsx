'use client';

import React from "react";
import Link from "next/link";
import type { TopicIndexEntry } from "@/schemas/topics-index";

interface TopicsPageClientProps {
  topics: TopicIndexEntry[];
}

export function TopicsPageClient({ topics }: TopicsPageClientProps) {
  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(topics.map((topic) => topic.category)));
    return ["All", ...unique];
  }, [topics]);

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredTopics = React.useMemo(() => {
    if (selectedCategory === "All") {
      return topics;
    }
    return topics.filter((topic) => topic.category === selectedCategory);
  }, [topics, selectedCategory]);

  const totalControls = React.useMemo(
    () => topics.reduce((sum, topic) => sum + topic.controls, 0),
    [topics]
  );

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Security Topics
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Comprehensive coverage of cybersecurity domains with practical controls and implementation guidance.
            </p>

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

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
              }`}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{topics.length}</div>
            <div className="text-sm text-slate-400">Topics</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{totalControls}</div>
            <div className="text-sm text-slate-400">Total Controls</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{Math.max(categories.length - 1, 0)}</div>
            <div className="text-sm text-slate-400">Categories</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-sm text-slate-400">Practical</div>
          </div>
        </div>

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
                <span className={`px-2 py-1 text-xs rounded-full ${levelBadgeClass(topic.level)}`}>
                  {topic.level}
                </span>
              </div>
              {topic.summary ? (
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{topic.summary}</p>
              ) : (
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">
                  Explore the full topic to learn more.
                </p>
              )}
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

      <footer className="border-t border-slate-800 mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.</p>
      </footer>
    </main>
  );
}

function levelBadgeClass(level: string): string {
  const normalized = level.toLowerCase();

  if (normalized === "beginner") {
    return "bg-green-900 text-green-200";
  }

  if (normalized === "intermediate") {
    return "bg-yellow-900 text-yellow-200";
  }

  return "bg-red-900 text-red-200";
}
