import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include MDX in page extensions
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,

  async redirects() {
    return [
      // ── Topics: short slug → canonical ──
      { source: '/topics/iam',              destination: '/topics/identity-access-management/intro', permanent: true },
      { source: '/topics/iam/:slug',        destination: '/topics/identity-access-management/:slug', permanent: true },
      { source: '/topics/zero-trust',       destination: '/topics/zero-trust-architecture/intro',    permanent: true },
      { source: '/topics/zero-trust/:slug', destination: '/topics/zero-trust-architecture/:slug',    permanent: true },
      { source: '/topics/data-security',       destination: '/topics/data-protection/intro',         permanent: true },
      { source: '/topics/data-security/:slug', destination: '/topics/data-protection/:slug',         permanent: true },
      { source: '/topics/logging-monitoring-incident-response',       destination: '/topics/logging-and-monitoring/intro', permanent: true },
      { source: '/topics/logging-monitoring-incident-response/:slug', destination: '/topics/logging-and-monitoring/:slug', permanent: true },

      // ── Guides: short slug → canonical ──
      { source: '/guides/iam',              destination: '/guides/identity-access-management/intro', permanent: true },
      { source: '/guides/iam/:slug',        destination: '/guides/identity-access-management/:slug', permanent: true },
      { source: '/guides/containers',       destination: '/guides/container-security/intro',         permanent: true },
      { source: '/guides/containers/:slug', destination: '/guides/container-security/:slug',         permanent: true },
    ];
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
