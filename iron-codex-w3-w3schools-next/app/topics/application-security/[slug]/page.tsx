import type { Metadata } from "next";
import Client from "./application_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  intro: "Introduction",
  "input-validation": "Input Validation", "prevent-sqli": "Prevent SQLi", "prevent-xss": "Prevent XSS", "prevent-csrf": "Prevent CSRF",
  "strong-auth": "Strong Authentication", "session-management": "Session Management", "rbac": "Role-Based Access", "privilege-escalation": "Privilege Escalation",
  "data-encryption": "Data Encryption", "secure-storage": "Secure Storage", "dlp": "Data Loss Prevention", "secure-file-handling": "Secure File Handling",
  "security-headers": "Security Headers", "error-handling": "Error Handling & Logging", "rate-limiting": "Rate Limiting", "config-management": "Config Management",
  "sast": "SAST", "dast": "DAST", "iast": "IAST", "pentest": "Penetration Testing", "code-review": "Code Review", "dependency-scan": "Dependency Scanning",
  "owasp-top-10": "OWASP Top 10",
  "quiz": "Quiz", "snippets": "Snippets",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Application Security`,
    description: `Application Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
