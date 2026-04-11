import type { Metadata } from "next";
import Client from "./threat_intelligence_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Intelligence Sources",
  "control-2": "IOC Management",
  "control-3": "TTP Analysis",
  "control-4": "MITRE ATT&CK Framework",
  "control-5": "Proactive Hunting",
  "control-6": "Hypothesis-Driven Hunting",
  "control-7": "Behavioral Analysis",
  "control-8": "Threat Attribution",
  "control-9": "Campaign Tracking",
  "control-10": "Risk Assessment",
  "control-11": "Information Sharing",
  "control-12": "STIX/TAXII Implementation",
  "control-13": "Industry Collaboration"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Threat Intelligence`,
    description: `Threat Intelligence — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
