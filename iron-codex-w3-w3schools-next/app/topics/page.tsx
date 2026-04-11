'use client';
import React from "react";
import { PromoBadge } from "@/components/PromoFlare";
import { topics, topicCategories } from "@/data/topics";

const categories = ["All", ...topicCategories];

export default function TopicsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const filteredTopics = selectedCategory === "All" 
    ? topics 
    : topics.filter(topic => topic.category === selectedCategory);

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
            <form action="/search" method="GET" role="search" className="mt-6 flex w-full max-w-xl gap-2">
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
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
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
            <div className="text-2xl font-bold text-emerald-400">{topics.length}</div>
            <div className="text-sm text-slate-400">Topics</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{topics.reduce((sum, topic) => sum + topic.controls, 0)}</div>
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
          {filteredTopics.map((topic, i) => (
            <article
              key={topic.slug}
              className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)] hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-emerald-200 group-hover:text-emerald-100 transition-colors">
                  {topic.title}
                </h2>
                <PromoBadge
                  label={topic.level}
                  tone="active"
                  className={
                    topic.level === 'Beginner'
                      ? 'bg-green-900/60 border-green-500/50 text-green-100'
                      : topic.level === 'Intermediate'
                        ? 'bg-yellow-900/60 border-yellow-500/50 text-yellow-100'
                        : 'bg-red-900/60 border-red-500/50 text-red-100'
                  }
                />
              </div>
              <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                {topic.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-400">
                  {topic.controls} controls
                </span>
                <a href={`/topics/${topic.slug}/intro`} className="text-emerald-400 text-sm uppercase tracking-[0.3em] hover:text-emerald-300 transition-colors group-hover:translate-x-0.5 inline-block duration-200">Explore →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}