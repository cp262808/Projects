import type { MDXComponents } from 'mdx/types'
import Callout from '@/components/mdx/Callout'
import Badge from '@/components/mdx/Badge'
import { Steps, Step } from '@/components/mdx/Steps'

/**
 * Ensures MDX shortcodes like <Badge/>, <Callout/>, <Steps/> work across all MDX pages.
 * Place this file at the REPO ROOT (same level as /app).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Global typography tweaks (optional)
    h1: (props) => <h1 className="text-3xl font-bold mt-6 mb-3" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-8 mb-3" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />,
    code: (props) => <code className="px-1.5 py-0.5 bg-gray-100 rounded" {...props} />,
    pre: (props) => <pre className="rounded-lg border bg-white" {...props} />,

    // Shortcodes
    Callout,
    Badge,
    Steps,
    Step,

    ...components,
  }
}
