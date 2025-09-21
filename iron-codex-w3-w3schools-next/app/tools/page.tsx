'use client';
import React from "react";
import Link from "next/link";

import { toolCategories, tools, toolTypes } from "@/data/tools";

const categories = ["All", ...toolCategories];
const types = ["All", ...toolTypes];

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedType, setSelectedType] = React.useState("All");
  
  const filteredTools = tools.filter(tool => {
    const categoryMatch = selectedCategory === "All" || tool.category === selectedCategory;
    const typeMatch = selectedType === "All" || tool.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const toolsByCategory = toolCategories.map(category => ({
    name: category,
    tools: tools.filter(tool => tool.category === category),
    count: tools.filter(tool => tool.category === category).length
  }));

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Security Tools
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Curated collection of essential cybersecurity tools for professionals, from vulnerability scanners to incident response platforms.
            </p>
            
            {/* Search */}
            <form action="/search" role="search" className="mt-6 flex w-full max-w-xl gap-2">
              <input
                name="q"
                type="search"
                aria-label="Search tools"
                placeholder="Search security tools..."
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
        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Category Filters */}
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Category</h3>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Type</h3>
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition ${
                    selectedType === type
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{tools.length}</div>
            <div className="text-sm text-slate-400">Total Tools</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{toolCategories.length}</div>
            <div className="text-sm text-slate-400">Categories</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{tools.filter(tool => tool.type === "Open Source").length}</div>
            <div className="text-sm text-slate-400">Open Source</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-sm text-slate-400">Vetted</div>
          </div>
        </div>

        {/* Tools Grid */}
        {selectedCategory === "All" ? (
          // Show by categories when "All" is selected
          <div className="space-y-12">
            {toolsByCategory.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-emerald-400">
                    {category.name}
                  </h2>
                  <span className="text-sm text-slate-400">
                    {category.count} tools
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools
                    .filter(tool => selectedType === "All" || tool.type === selectedType)
                    .map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">
                          {tool.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded ${
                          tool.type === 'Open Source' ? 'bg-green-900 text-green-200' :
                          tool.type === 'Commercial' ? 'bg-blue-900 text-blue-200' :
                          tool.type === 'Freemium' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-purple-900 text-purple-200'
                        }`}>
                          {tool.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">
                        {tool.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">
                          {tool.platform}
                        </span>
                        <span className="text-emerald-400 group-hover:translate-x-1 transition-transform text-sm">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show filtered results when specific category is selected
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">
                    {tool.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    tool.type === 'Open Source' ? 'bg-green-900 text-green-200' :
                    tool.type === 'Commercial' ? 'bg-blue-900 text-blue-200' :
                    tool.type === 'Freemium' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-purple-900 text-purple-200'
                  }`}>
                    {tool.type}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  {tool.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">
                    {tool.platform}
                  </span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform text-sm">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Community Section */}
        <section className="mt-16 rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
          <h2 className="text-xl font-semibold mb-3">Missing a Tool?</h2>
          <p className="text-slate-300 mb-6">
            Help us expand our collection with community recommendations.
          </p>
          <Link
            href="https://github.com/iron-codex"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
          >
            Submit on GitHub
          </Link>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.</p>
      </footer>
    </main>
  );
}