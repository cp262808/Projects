'use client';

import React from "react";
import Link from "next/link";
import type { GuideSummary, GuideDifficulty } from "@/schemas/guide";

type Props = {
  guides: GuideSummary[];
};

type DifficultyFilter = "All" | GuideDifficulty;

const DIFFICULTY_ORDER: GuideDifficulty[] = ["Beginner", "Intermediate", "Advanced", "Expert"];

const DIFFICULTY_STYLES: Record<GuideDifficulty, string> = {
  Beginner: "bg-green-900 text-green-200",
  Intermediate: "bg-yellow-900 text-yellow-200",
  Advanced: "bg-blue-900 text-blue-200",
  Expert: "bg-purple-900 text-purple-200"
};

export default function GuidesIndex({ guides }: Props) {
  const availableDifficulties = React.useMemo<DifficultyFilter[]>(() => {
    const unique = new Set<GuideDifficulty>();
    for (const guide of guides) {
      unique.add(guide.difficulty);
    }
    return [
      "All",
      ...DIFFICULTY_ORDER.filter((difficulty) => unique.has(difficulty))
    ];
  }, [guides]);

  const [selectedDifficulty, setSelectedDifficulty] = React.useState<DifficultyFilter>("All");

  const filteredGuides = React.useMemo(() => {
    if (selectedDifficulty === "All") {
      return guides;
    }
    return guides.filter((guide) => guide.difficulty === selectedDifficulty);
  }, [guides, selectedDifficulty]);

  const totals = React.useMemo(() => {
    if (!guides.length) {
      return {
        guideCount: 0,
        averageReadTime: 0,
        controlCount: 0,
        difficultyCount: 0
      };
    }
    const controlCount = guides.reduce((sum, guide) => sum + guide.controlCount, 0);
    const averageReadTime = Math.round(
      guides.reduce((sum, guide) => sum + guide.readTimeMinutes, 0) / guides.length
    );
    const difficultyCount = new Set(guides.map((guide) => guide.difficulty)).size;
    return {
      guideCount: guides.length,
      averageReadTime,
      controlCount,
      difficultyCount
    };
  }, [guides]);

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Deep Dive Guides
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Comprehensive implementation guides for complex security topics with step-by-step instructions and real-world examples.
            </p>

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

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex gap-2 mb-8 flex-wrap">
          {availableDifficulties.map((difficulty) => (
            <button
              key={difficulty}
              type="button"
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedDifficulty === difficulty
                  ? "bg-emerald-600 text-white"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{totals.guideCount}</div>
            <div className="text-sm text-slate-400">Guides</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{totals.controlCount}</div>
            <div className="text-sm text-slate-400">Controls Covered</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{totals.averageReadTime} min</div>
            <div className="text-sm text-slate-400">Avg Read Time</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{totals.difficultyCount}</div>
            <div className="text-sm text-slate-400">Difficulty Levels</div>
          </div>
        </div>

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
                    <span className={`px-2 py-1 text-xs rounded-full ${DIFFICULTY_STYLES[guide.difficulty]}`}>
                      {guide.difficulty}
                    </span>
                  </div>

                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 text-right min-w-[12rem]">
                  <div className="text-sm text-emerald-400 font-medium">
                    {guide.controlCount} Controls
                  </div>
                  <div className="text-sm text-slate-400">
                    {guide.readTime}
                  </div>
                  {guide.lastUpdated && (
                    <div className="text-xs text-slate-500">
                      Updated {guide.lastUpdated}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {filteredGuides.length === 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">
              No guides match this difficulty level yet. Try another filter.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
