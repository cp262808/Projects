'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "generative-ai-llm-security-apps-data-and-ops-3-items-2": dynamic(() => import("@/content/topics/ai-ml-security/generative-ai-llm-security-apps-data-and-ops-3-items-2.mdx")),
  "generative-ai-llm-security-apps-data-and-ops-3-items": dynamic(() => import("@/content/topics/ai-ml-security/generative-ai-llm-security-apps-data-and-ops-3-items.mdx")),
  "intro": dynamic(() => import("@/content/topics/ai-ml-security/intro.mdx"))
};

export default function Client({ params }: { params: { slug: string } }) {
  const slug = params?.slug || 'intro';
  const Content = ContentBySlug[slug] || ContentBySlug["intro"];
  if (!Content) return notFound();

  return (
    <main className="prose mx-auto p-6">
      <Content />
    </main>
  );
}
