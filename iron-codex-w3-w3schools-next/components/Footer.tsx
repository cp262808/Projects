import { PromoFlare } from "./PromoFlare";

const sections: { title: string; eyebrow: string; items: string[] }[] = [
  {
    title: "Security References",
    eyebrow: "Preview Index",
    items: ["API Security", "Cloud Security", "Container Security", "Identity & Access", "All References"],
  },
  {
    title: "Implementation Guides",
    eyebrow: "Guide Preview",
    items: ["Getting Started", "Best Practices", "Compliance Mapping", "Tool Integration"],
  },
  {
    title: "Resources",
    eyebrow: "Ecosystem",
    items: ["Security Tools", "Vendor Documentation", "Standards & Frameworks", "Community"],
  },
  {
    title: "About",
    eyebrow: "Team",
    items: ["Our Mission", "Contributing", "Contact", "GitHub"],
  },
];

export default function Footer(){
  return (
    <footer className="bg-[#111827] text-white pt-12 pb-6">
      <div className="container grid gap-6 md:grid-cols-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sky-400 font-semibold mb-2">{section.title}</h3>
            <ul className="space-y-2 text-gray-300">
              {section.items.map((item) => (
                <li key={item}>
                  <PromoFlare label={item} eyebrow={section.eyebrow} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
        © 2024 Iron Codex. The world&rsquo;s largest cybersecurity reference platform.
      </div>
    </footer>
  )
}
