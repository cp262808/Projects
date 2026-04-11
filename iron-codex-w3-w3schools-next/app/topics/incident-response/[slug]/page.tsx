import type { Metadata } from "next";
import Client from "./incident_response_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Incident Response Plan",
  "control-2": "Incident Response Team",
  "control-3": "Tools and Resources",
  "control-4": "Security Information and Event Management (SIEM)",
  "control-5": "Intrusion Detection and Prevention",
  "control-6": "Log Analysis and Monitoring",
  "control-7": "Threat Hunting",
  "control-8": "Incident Containment Procedures",
  "control-9": "Network Isolation",
  "control-10": "Evidence Preservation",
  "control-11": "Threat Eradication",
  "control-12": "System Recovery",
  "control-13": "Vulnerability Remediation",
  "control-14": "Internal Communication",
  "control-15": "External Communication",
  "control-16": "Law Enforcement Coordination",
  "control-17": "Post-Incident Analysis"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Incident Response`,
    description: `Incident Response — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
