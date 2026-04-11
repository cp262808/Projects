import type { Metadata } from "next";
import Client from "./physical_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Implement Multi-Factor Access Control",
  "control-2": "Security Guards and Reception",
  "control-3": "Perimeter Security",
  "control-4": "CCTV Surveillance System",
  "control-5": "Intrusion Detection Systems",
  "control-6": "Security Lighting",
  "control-7": "Fire Detection and Suppression",
  "control-8": "Climate Control",
  "control-9": "Power Protection",
  "control-10": "Equipment Security",
  "control-11": "Clean Desk Policy"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Physical Security`,
    description: `Physical Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
