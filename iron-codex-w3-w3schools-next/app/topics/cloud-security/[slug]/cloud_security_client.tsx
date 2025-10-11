'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "cdn-deep-dives-cloudflare-akamai-fastly-1-items-2": dynamic(() => import("@/content/topics/cloud-security/cdn-deep-dives-cloudflare-akamai-fastly-1-items-2.mdx")),
  "cdn-deep-dives-cloudflare-akamai-fastly-1-items": dynamic(() => import("@/content/topics/cloud-security/cdn-deep-dives-cloudflare-akamai-fastly-1-items.mdx")),
  "cloud-security-cdn-expanded-59-items-2": dynamic(() => import("@/content/topics/cloud-security/cloud-security-cdn-expanded-59-items-2.mdx")),
  "cloud-security-cdn-expanded-59-items": dynamic(() => import("@/content/topics/cloud-security/cloud-security-cdn-expanded-59-items.mdx")),
  "intro": dynamic(() => import("@/content/topics/cloud-security/intro.mdx"))
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
