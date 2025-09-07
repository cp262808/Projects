import type { MDXComponents } from 'mdx/types'

/**
 * MDX components mapping for the App Router.
 * You can customize built-ins (h1, p, code, img) or add shortcodes.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
