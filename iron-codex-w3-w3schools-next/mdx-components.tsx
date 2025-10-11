import type { MDXComponents } from 'mdx/types'
import Callout from '@/components/mdx/Callout'
import Badge from '@/components/mdx/Badge'
import { Steps, Step } from '@/components/mdx/Steps'

/**
 * Ensures MDX shortcodes like <Badge/>, <Callout/>, <Steps/> work across all MDX pages.
 * Place this file at the REPO ROOT (same level as /app).
 */

export function useMDXComponents(components: any) {
  return {
    ...components,
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <article className="prose prose-slate max-w-none px-4 lg:px-6 py-6">{children}</article>
    ),
  };
}

