'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "emerging-attack-surfaces-edge-iot-ot-5g-1-items-2": dynamic(() => import("@/content/topics/cdn-deep-dives/emerging-attack-surfaces-edge-iot-ot-5g-1-items-2.mdx")),
  "emerging-attack-surfaces-edge-iot-ot-5g-1-items": dynamic(() => import("@/content/topics/cdn-deep-dives/emerging-attack-surfaces-edge-iot-ot-5g-1-items.mdx"))
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
