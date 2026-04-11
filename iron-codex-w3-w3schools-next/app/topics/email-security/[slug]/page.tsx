import type { Metadata } from "next";
import Client from "./email_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "SPF Implementation",
  "control-2": "DKIM Signing",
  "control-3": "DMARC Policy",
  "control-4": "Anti-Phishing",
  "control-5": "Malware Scanning",
  "control-6": "URL Protection",
  "control-7": "Sandboxing",
  "control-8": "TLS Encryption",
  "control-9": "End-to-End Encryption",
  "control-10": "Email Gateway Security",
  "control-11": "Spam Filtering",
  "control-12": "Content Filtering",
  "control-13": "Data Loss Prevention"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Email Security`,
    description: `Email Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
