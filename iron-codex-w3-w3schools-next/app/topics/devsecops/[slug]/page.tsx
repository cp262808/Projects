import type { Metadata } from "next";
import Client from "./devsecops_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Secure CI/CD Pipelines",
  "control-2": "Static Code Analysis (SAST)",
  "control-3": "Dynamic Testing (DAST)",
  "control-4": "Dependency Scanning",
  "control-5": "Secure Coding Standards",
  "control-6": "Code Review Security",
  "control-7": "Secret Management",
  "control-8": "License Compliance",
  "control-9": "IaC Security Scanning",
  "control-10": "Security Templates",
  "control-11": "Configuration Validation",
  "control-12": "Container Image Scanning",
  "control-13": "Registry Security",
  "control-14": "Runtime Protection",
  "control-15": "Security Monitoring",
  "control-16": "Incident Response",
  "control-17": "Compliance Automation",
  "control-18": "Security Training",
  "control-19": "Security Champions",
  "control-20": "Threat Modeling",
  "control-21": "Security Metrics",
  "control-22": "Feedback Loops",
  "control-23": "Policy as Code"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Devsecops`,
    description: `Devsecops — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
