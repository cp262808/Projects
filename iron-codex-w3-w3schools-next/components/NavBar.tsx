"use client";

import Link from "next/link";

export default function NavBar() {
  const topics = ['API','Cloud','Identity','Containers','Network','SaaS','IR','Crypto','DevSecOps','Threat Intel','Mobile','Web','DB','IoT','AI/ML','Supply','Zero Trust','Compliance','Risk','Arch','Vuln','Pentest'];

  return (
    <header className="sticky top-0 z-50">
      <div className="w3-bar w3-green">
        <Link href="/" className="w3-bar-item w3-button">Iron Codex</Link>
        <Link href="/tutorials" className="w3-bar-item w3-button w3-hide-small">Tutorials</Link>
        <Link href="/references" className="w3-bar-item w3-button w3-hide-small">References</Link>
        <Link href="/exercises" className="w3-bar-item w3-button w3-hide-small">Exercises</Link>
        <Link href="/certifications" className="w3-bar-item w3-button w3-hide-small w3-hide-medium">Certifications</Link>
      </div>
      <div className="w3-bar w3-dark-grey">
        {topics.map((t) => (
          <Link
            key={t}
            href={`/topics/${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="w3-bar-item w3-button"
          >
            {t}
          </Link>
        ))}
      </div>
    </header>
  );
}
