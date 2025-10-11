'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "api-abuse-detection-telemetry1-items-2": dynamic(() => import("@/content/topics/api-security/api-abuse-detection-telemetry1-items-2.mdx")),
  "api-abuse-detection-telemetry1-items": dynamic(() => import("@/content/topics/api-security/api-abuse-detection-telemetry1-items.mdx")),
  "api-security-expanded-74-items-2": dynamic(() => import("@/content/topics/api-security/api-security-expanded-74-items-2.mdx")),
  "api-security-expanded-74-items": dynamic(() => import("@/content/topics/api-security/api-security-expanded-74-items.mdx")),
  "intro": dynamic(() => import("@/content/topics/api-security/intro.mdx"))
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
