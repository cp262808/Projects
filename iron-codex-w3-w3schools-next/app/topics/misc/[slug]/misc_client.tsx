'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "identity-access-management-expanded-47-items-2": dynamic(() => import("@/content/topics/misc/identity-access-management-expanded-47-items-2.mdx")),
  "identity-access-management-expanded-47-items": dynamic(() => import("@/content/topics/misc/identity-access-management-expanded-47-items.mdx")),
  "identity-federation-pitfalls-saml-oidc-1-items-2": dynamic(() => import("@/content/topics/misc/identity-federation-pitfalls-saml-oidc-1-items-2.mdx")),
  "identity-federation-pitfalls-saml-oidc-1-items": dynamic(() => import("@/content/topics/misc/identity-federation-pitfalls-saml-oidc-1-items.mdx")),
  "key-management-crypto-expanded-21-items-2": dynamic(() => import("@/content/topics/misc/key-management-crypto-expanded-21-items-2.mdx")),
  "key-management-crypto-expanded-21-items": dynamic(() => import("@/content/topics/misc/key-management-crypto-expanded-21-items.mdx")),
  "reference-evidence-shortcuts1-items": dynamic(() => import("@/content/topics/misc/reference-evidence-shortcuts1-items.mdx")),
  "special-review-modes-quick-assessment-risk-scoring-2-items-2": dynamic(() => import("@/content/topics/misc/special-review-modes-quick-assessment-risk-scoring-2-items-2.mdx")),
  "special-review-modes-quick-assessment-risk-scoring-2-items": dynamic(() => import("@/content/topics/misc/special-review-modes-quick-assessment-risk-scoring-2-items.mdx")),
  "technology-deep-dives-best-practices18-items-2": dynamic(() => import("@/content/topics/misc/technology-deep-dives-best-practices18-items-2.mdx")),
  "technology-deep-dives-best-practices18-items": dynamic(() => import("@/content/topics/misc/technology-deep-dives-best-practices18-items.mdx"))
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
