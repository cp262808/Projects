export default function Footer(){
  return (
    <footer className="bg-[#111827] text-white pt-12 pb-6">
      <div className="container grid gap-6 md:grid-cols-4">
        <div>
          <h3 className="text-sky-400 font-semibold mb-2">Security References</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/topics/api-security">API Security</a></li>
            <li><a href="/topics/cloud-security">Cloud Security</a></li>
            <li><a href="/topics/container-security">Container Security</a></li>
            <li><a href="/topics/identity-access">Identity & Access</a></li>
            <li><a href="/topics">All References</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sky-400 font-semibold mb-2">Implementation Guides</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/guides">Getting Started</a></li>
            <li><a href="/guides/best-practices">Best Practices</a></li>
            <li><a href="/maps">Compliance Mapping</a></li>
            <li><a href="/guides/tools">Tool Integration</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sky-400 font-semibold mb-2">Resources</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/tools">Security Tools</a></li>
            <li><a href="/vendors">Vendor Documentation</a></li>
            <li><a href="/standards">Standards & Frameworks</a></li>
            <li><a href="/community">Community</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sky-400 font-semibold mb-2">About</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/about">Our Mission</a></li>
            <li><a href="/contributing">Contributing</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="https://github.com/cp262808">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="container border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
        © 2025 Iron Codex. The world's largest cybersecurity reference platform.
      </div>
    </footer>
  )
}
