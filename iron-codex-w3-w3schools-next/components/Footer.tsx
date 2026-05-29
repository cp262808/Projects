import Link from "next/link";

const footerSections: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Security Topics",
    links: [
      { label: "API Security", href: "/topics/api-security/intro" },
      { label: "Cloud Security", href: "/topics/cloud-security/intro" },
      { label: "Container Security", href: "/topics/container-security/intro" },
      { label: "Identity & Access", href: "/topics/identity-access-management/intro" },
      { label: "All Topics", href: "/topics" },
    ],
  },
  {
    title: "Deep Dive Guides",
    links: [
      { label: "API Security Guide", href: "/guides/api-security/intro" },
      { label: "Cloud Hardening", href: "/guides/cloud-security/intro" },
      { label: "Incident Response", href: "/guides/incident-response/intro" },
      { label: "All Guides", href: "/guides" },
    ],
  },
  {
    title: "Tools & Resources",
    links: [
      { label: "Security Tools", href: "/tools" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Mission", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-6">
        {/* Link columns */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-emerald-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-dotPulse" />
            Built for security professionals
          </div>
        </div>
      </div>
    </footer>
  );
}
