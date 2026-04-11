import type { Metadata } from "next";
import Client from "./red_team_operations_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Engagement Scoping and Rules",
  "control-2": "Threat Modeling",
  "control-3": "Risk Assessment",
  "control-4": "Open Source Intelligence (OSINT)",
  "control-5": "Network Reconnaissance",
  "control-6": "Social Engineering Reconnaissance",
  "control-7": "External Penetration Testing",
  "control-8": "Phishing Campaigns",
  "control-9": "Physical Security Testing",
  "control-10": "Wireless Network Testing",
  "control-11": "Privilege Escalation",
  "control-12": "Lateral Movement",
  "control-13": "Persistence Mechanisms",
  "control-14": "Data Exfiltration Testing",
  "control-15": "Pretexting Operations",
  "control-16": "Vishing and Smishing",
  "control-17": "Physical Social Engineering",
  "control-18": "Custom Exploit Development",
  "control-19": "Evasion Techniques",
  "control-20": "Living off the Land",
  "control-21": "Supply Chain Testing",
  "control-22": "Adversary Emulation",
  "control-23": "Purple Team Exercises",
  "control-24": "Tabletop Exercises",
  "control-25": "Comprehensive Reporting",
  "control-26": "Executive Briefings",
  "control-27": "Remediation Validation"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Red Team Operations`,
    description: `Red Team Operations — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
