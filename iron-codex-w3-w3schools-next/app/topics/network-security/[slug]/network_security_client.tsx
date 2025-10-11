'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "intro": dynamic(() => import("@/content/topics/network-security/intro.mdx")),
  "network-on-prem-expanded-24-items-2": dynamic(() => import("@/content/topics/network-security/network-on-prem-expanded-24-items-2.mdx")),
  "network-on-prem-expanded-24-items": dynamic(() => import("@/content/topics/network-security/network-on-prem-expanded-24-items.mdx"))
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
