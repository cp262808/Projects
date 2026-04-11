import type { Metadata } from "next";
import Client from "./security_awareness_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Security Awareness Training Program",
  "control-2": "Role-Based Security Training",
  "control-3": "New Employee Security Orientation",
  "control-4": "Regular Training Updates",
  "control-5": "Phishing Simulation Programs",
  "control-6": "Social Engineering Awareness",
  "control-7": "Incident Reporting Training",
  "control-8": "Security Culture Development",
  "control-9": "Awareness Program Metrics",
  "control-10": "Communication Campaigns"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Security Awareness`,
    description: `Security Awareness — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
