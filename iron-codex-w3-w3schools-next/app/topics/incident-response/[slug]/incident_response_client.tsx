'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "intro": dynamic(() => import("@/content/topics/incident-response/intro.mdx"))
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
