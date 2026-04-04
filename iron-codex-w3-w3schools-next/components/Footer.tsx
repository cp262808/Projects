import Link from "next/link";

const sections: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Security References",
    items: [
      { label: "API Security", href: "/topics/api-security/intro" },
      { label: "Cloud Security", href: "/topics/cloud-security/intro" },
      { label: "Container Security", href: "/topics/container-security/intro" },
      { label: "Identity & Access", href: "/topics/identity-access-management/intro" },
      { label: "All References", href: "/topics" },
    ],
  },
  {
    title: "Implementation Guides",
    items: [
      { label: "API Security Guide", href: "/guides/api-security/intro" },
      { label: "Cloud Hardening", href: "/guides/cloud-security/intro" },
      { label: "Incident Response", href: "/guides/incident-response/intro" },
      { label: "SaaS & Vendor Reviews", href: "/guides/saas-security/intro" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Security Tools", href: "/tools" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "About",
    items: [
      { label: "Our Mission", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-12 pb-6">
      <div className="mx-auto max-w-6xl px-4 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-emerald-400 font-semibold mb-3 text-sm uppercase tracking-wide">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-emerald-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 border-t border-slate-800 mt-8 pt-4 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Iron Codex. Practical cybersecurity knowledge.
      </div>
    </footer>
  );
}
