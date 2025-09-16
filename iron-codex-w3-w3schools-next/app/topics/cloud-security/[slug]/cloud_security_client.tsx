'use client';
import dynamic from "next/dynamic";
import TopicShell, { TOCGroup } from "@/components/TopicShell";

type Slug = string;

const ContentBySlug: Record<string, any> = {
  "intro": dynamic(() => import("@/content/topics/cloud-security/intro.mdx")),
};

const TOC: TOCGroup[] = [
  ["Cloud Security", [{ id: "intro", label: "Introduction" }]],
];

export default function Client({ slug }: { slug: Slug }) {
  const Content = ContentBySlug[slug];
  return (
    <TopicShell kind="topics" topic="cloud-security" title="Cloud Security" slug={slug} toc={TOC}>
      {Content ? <Content /> : <div className="text-slate-400">Section not found.</div>}
    </TopicShell>
  );
}
