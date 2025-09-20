import Link from "next/link";

import type { HomeContent } from "@/schemas/home";

type HomeLandingProps = {
  content: HomeContent;
};

export default function HomeLanding({ content }: HomeLandingProps) {
  const { hero, quickLinks, topicBuckets, toolSpotlight } = content;

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{hero.title}</h1>
              <p className="mt-3 text-slate-300">{hero.subtitle}</p>
              <form action={hero.search.action} role="search" className="mt-6 flex w-full max-w-xl gap-2">
                <input
                  name="q"
                  type="search"
                  aria-label="Search Iron Codex"
                  placeholder={hero.search.placeholder}
                  className="h-11 flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <button className="h-11 rounded-md bg-emerald-600 px-4 text-white hover:bg-emerald-700">
                  {hero.search.buttonLabel}
                </button>
              </form>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {hero.stats.map((stat) => {
                  const body = (
                    <>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-semibold text-slate-100">
                        {stat.value.toLocaleString("en-US")}
                      </p>
                    </>
                  );

                  return stat.href ? (
                    <Link
                      key={stat.key}
                      href={stat.href}
                      className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 transition hover:border-emerald-600 hover:text-emerald-400"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div
                      key={stat.key}
                      className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                    >
                      {body}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {quickLinks.map((q) => (
                  <Link
                    key={q.key}
                    href={q.href}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-center text-sm text-slate-100 transition hover:border-emerald-600 hover:bg-slate-800 hover:text-emerald-400"
                  >
                    {q.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics index */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="mb-6 text-xl font-semibold">Browse Topics</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {topicBuckets.map((bucket) => (
            <div key={bucket.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="mb-2 text-sm uppercase tracking-wide text-emerald-400">{bucket.title}</h3>
              <ul className="space-y-1 text-sm">
                {bucket.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-slate-200 hover:text-emerald-400">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tools spotlight */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Popular Tools</h2>
            <Link href="/tools" className="text-sm text-emerald-400 underline-offset-4 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {toolSpotlight.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-sm text-slate-200 transition hover:border-emerald-600 hover:text-emerald-400"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex.</p>
      </footer>
    </main>
  );
}
