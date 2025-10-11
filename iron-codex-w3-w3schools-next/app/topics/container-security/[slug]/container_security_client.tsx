'use client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentBySlug: Record<string, any> = {
  "containers-kubernetes-expanded-29-items-2": dynamic(() => import("@/content/topics/container-security/containers-kubernetes-expanded-29-items-2.mdx")),
  "containers-kubernetes-expanded-29-items": dynamic(() => import("@/content/topics/container-security/containers-kubernetes-expanded-29-items.mdx")),
  "intro": dynamic(() => import("@/content/topics/container-security/intro.mdx")),
  "kubernetes-runtime-security-ebpf-gvisor-kata-1-items-2": dynamic(() => import("@/content/topics/container-security/kubernetes-runtime-security-ebpf-gvisor-kata-1-items-2.mdx")),
  "kubernetes-runtime-security-ebpf-gvisor-kata-1-items": dynamic(() => import("@/content/topics/container-security/kubernetes-runtime-security-ebpf-gvisor-kata-1-items.mdx"))
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
