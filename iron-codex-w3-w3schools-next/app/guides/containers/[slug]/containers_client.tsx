'use client';
import dynamic from "next/dynamic";
import TopicShell, { TOCGroup } from "@/components/TopicShell";

type Slug = string;

const ContentBySlug: Record<string, any> = {
  "intro": dynamic(() => import("@/content/guides/containers/intro.mdx")),
};

const TOC: TOCGroup[] = [
  ["Containers", [{ id: "intro", label: "Introduction" }]],
];

export default function Client({ slug }: { slug: Slug }) {
  const Content = ContentBySlug[slug];
  return (
    <TopicShell kind="guides" topic="containers" title="Containers" slug={slug} toc={TOC}>
      {Content ? <Content /> : <div className="text-slate-400">Section not found.</div>}
    </TopicShell>
  );
}
