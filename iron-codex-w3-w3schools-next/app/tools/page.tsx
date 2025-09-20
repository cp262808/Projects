import { loadTools } from "@/lib/loadTools";
import { ToolsExplorer } from "@/components/ToolsExplorer";

export default function ToolsPage() {
  const toolsData = loadTools();

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Security Tools</h1>
            <p className="mt-3 text-slate-300 text-lg">
              Curated collection of essential cybersecurity tools for professionals, from vulnerability scanners to incident
              response platforms.
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
              <button className="h-11 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition">Search</button>
            </form>
          </div>
        </div>
      </section>

      <ToolsExplorer data={toolsData} />

      {/* Footer */}
      <footer className="border-t border-slate-800 mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.</p>
      </footer>
    </main>
  );
}
