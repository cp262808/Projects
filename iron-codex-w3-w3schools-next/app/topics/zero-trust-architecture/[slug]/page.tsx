import type { Metadata } from "next";
import Client from "./zero_trust_architecture_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  intro: "Introduction",
  "never-trust": "Never Trust, Always Verify", "least-privilege": "Least Privilege Access", "assume-breach": "Assume Breach",
  "micro-segmentation": "Micro-Segmentation", "sdp": "Software-Defined Perimeter", "nac": "Network Access Control",
  "identity-centric": "Identity-Centric Security", "continuous-auth": "Continuous Authentication", "conditional-access": "Conditional Access",
  "data-centric": "Data-Centric Security", "encryption-everywhere": "Encryption Everywhere", "data-classification": "Data Classification",
  "behavioral-analytics": "Behavioral Analytics", "risk-based": "Risk-Based Decisions", "logging": "Comprehensive Logging", "automated-response": "Automated Response",
  quiz: "Quiz",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Zero Trust Architecture`,
    description: `Zero Trust Architecture — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
