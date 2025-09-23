import { PromoBadge } from "@/components/PromoFlare";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getToolBySlug, tools } from "@/data/tools";

type ToolPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: "Tool not found | Iron Codex",
    };
  }

  return {
    title: `${tool.name} | Security Tool`,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = tools
    .filter((candidate) => candidate.category === tool.category && candidate.slug !== tool.slug)
    .slice(0, 3);

  return (
    <main id="main" className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <PromoBadge
            label={(
              <span className="flex items-center gap-2">
                <span aria-hidden>←</span>
                <span>Back to tools</span>
              </span>
            )}
            tone="active"
            className="text-sm"
          />

          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-emerald-700/60 bg-emerald-600/10 px-3 py-1">
                {tool.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 font-medium ${
                  tool.type === "Open Source"
                    ? "bg-green-900/60 text-green-200"
                    : tool.type === "Commercial"
                      ? "bg-blue-900/60 text-blue-200"
                      : tool.type === "Freemium"
                        ? "bg-yellow-900/60 text-yellow-200"
                        : "bg-purple-900/60 text-purple-200"
                }`}
              >
                {tool.type}
              </span>
              <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1">{tool.platform}</span>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">{tool.name}</h1>
            <p className="mt-3 text-lg text-slate-300">{tool.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <article className="space-y-8">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-xl font-semibold text-emerald-400">Overview</h2>
              <p className="mt-4 text-slate-300">
                {tool.description} This {tool.type.toLowerCase()} tool supports {tool.category} workflows and is available on {tool.platform} deployments, making it easy to incorporate into existing security operations.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-xl font-semibold text-emerald-400">Key details</h2>
              <dl className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="font-medium text-slate-200">Category</dt>
                  <dd>{tool.category}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="font-medium text-slate-200">Tool type</dt>
                  <dd>{tool.type}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="font-medium text-slate-200">Supported platforms</dt>
                  <dd>{tool.platform}</dd>
                </div>
              </dl>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-lg font-semibold text-emerald-400">Related tools</h2>
              <div className="mt-4 space-y-3">
                {relatedTools.length > 0 ? (
                  relatedTools.map((relatedTool) => (
                    <article
                      key={relatedTool.slug}
                      className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3 transition cursor-default"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-200 text-emerald-200">
                          {relatedTool.name}
                        </span>
                        <PromoBadge label={relatedTool.platform} className="text-[10px]" />
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{relatedTool.description}</p>
                    </article>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">More tools in this category are coming soon.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
