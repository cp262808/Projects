'use client';

import React from "react";
import Link from "next/link";

import type { Tool, ToolsDocument } from "@/schemas/tool";

type ToolsExplorerProps = {
  data: ToolsDocument;
};

type GroupedCategory = {
  name: string;
  tools: Tool[];
};

export function ToolsExplorer({ data }: ToolsExplorerProps) {
  const allTools = React.useMemo(
    () =>
      data.tools.map((tool) => ({
        ...tool
      })),
    [data.tools]
  );

  const categoryNames = React.useMemo(() => {
    const seen = new Set<string>();
    const categories: string[] = [];
    for (const tool of allTools) {
      if (!seen.has(tool.category)) {
        seen.add(tool.category);
        categories.push(tool.category);
      }
    }
    return categories;
  }, [allTools]);

  const typeNames = React.useMemo(() => {
    const seen = new Set<string>();
    const types: string[] = [];
    for (const tool of allTools) {
      if (!seen.has(tool.type)) {
        seen.add(tool.type);
        types.push(tool.type);
      }
    }
    return types;
  }, [allTools]);

  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedType, setSelectedType] = React.useState<string>("All");

  const filteredTools = React.useMemo(() => {
    return allTools.filter((tool) => {
      const categoryMatch = selectedCategory === "All" || tool.category === selectedCategory;
      const typeMatch = selectedType === "All" || tool.type === selectedType;
      return categoryMatch && typeMatch;
    });
  }, [allTools, selectedCategory, selectedType]);

  const toolsByCategory = React.useMemo<GroupedCategory[]>(() => {
    return categoryNames.map((category) => ({
      name: category,
      tools: allTools.filter((tool) => tool.category === category)
    }));
  }, [allTools, categoryNames]);

  const totalOpenSource = React.useMemo(
    () => allTools.filter((tool) => tool.type === "Open Source").length,
    [allTools]
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Filters */}
      <div className="space-y-4 mb-8">
        {/* Category Filters */}
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-2">Category</h3>
          <div className="flex gap-2 flex-wrap">
            {["All", ...categoryNames].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-sm rounded-lg transition ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
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
            {["All", ...typeNames].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 text-sm rounded-lg transition ${
                  selectedType === type
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
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
          <div className="text-2xl font-bold text-emerald-400">{allTools.length}</div>
          <div className="text-sm text-slate-400">Total Tools</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{categoryNames.length}</div>
          <div className="text-sm text-slate-400">Categories</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{totalOpenSource}</div>
          <div className="text-sm text-slate-400">Open Source</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">100%</div>
          <div className="text-sm text-slate-400">Vetted</div>
        </div>
      </div>

      {/* Tools Grid */}
      {selectedCategory === "All" ? (
        <div className="space-y-12">
          {toolsByCategory.map((category) => {
            const toolsInCategory = category.tools.filter(
              (tool) => selectedType === "All" || tool.type === selectedType
            );

            if (toolsInCategory.length === 0) {
              return null;
            }

            return (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-emerald-400">{category.name}</h2>
                  <span className="text-sm text-slate-400">{category.tools.length} tools</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {toolsInCategory.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">
                          {tool.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            tool.type === "Open Source"
                              ? "bg-green-900 text-green-200"
                              : tool.type === "Commercial"
                                ? "bg-blue-900 text-blue-200"
                                : tool.type === "Freemium"
                                  ? "bg-yellow-900 text-yellow-200"
                                  : "bg-purple-900 text-purple-200"
                          }`}
                        >
                          {tool.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">{tool.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">{tool.platform}</span>
                        <span className="text-emerald-400 group-hover:translate-x-1 transition-transform text-sm">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">{tool.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    tool.type === "Open Source"
                      ? "bg-green-900 text-green-200"
                      : tool.type === "Commercial"
                        ? "bg-blue-900 text-blue-200"
                        : tool.type === "Freemium"
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-purple-900 text-purple-200"
                  }`}
                >
                  {tool.type}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-3">{tool.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">{tool.platform}</span>
                <span className="text-emerald-400 group-hover:translate-x-1 transition-transform text-sm">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Community Section */}
      <section className="mt-16 rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
        <h2 className="text-xl font-semibold mb-3">Missing a Tool?</h2>
        <p className="text-slate-300 mb-6">Help us expand our collection with community recommendations.</p>
        <Link
          href="https://github.com/iron-codex"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
        >
          Submit on GitHub
        </Link>
      </section>
    </section>
  );
}
