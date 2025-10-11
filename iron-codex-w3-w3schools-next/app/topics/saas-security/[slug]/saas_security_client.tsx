'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "saas-dlp-enhancements1-items-2": dynamic(() => import("@/content/topics/saas-security/saas-dlp-enhancements1-items-2.mdx")),
  "saas-dlp-enhancements1-items": dynamic(() => import("@/content/topics/saas-security/saas-dlp-enhancements1-items.mdx")),
  "saas-security-expanded-59-items-2": dynamic(() => import("@/content/topics/saas-security/saas-security-expanded-59-items-2.mdx")),
  "saas-security-expanded-59-items": dynamic(() => import("@/content/topics/saas-security/saas-security-expanded-59-items.mdx"))
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
