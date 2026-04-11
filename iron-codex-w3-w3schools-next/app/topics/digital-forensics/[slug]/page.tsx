import type { Metadata } from "next";
import Client from "./digital_forensics_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Forensic Imaging and Acquisition",
  "control-2": "Volatile Memory Acquisition",
  "control-3": "Mobile Device Forensics",
  "control-4": "Cloud Forensics",
  "control-5": "Network Forensics",
  "control-6": "Evidence Documentation",
  "control-7": "Secure Evidence Storage",
  "control-8": "Evidence Tracking",
  "control-9": "File System Analysis",
  "control-10": "Timeline Analysis",
  "control-11": "Registry Analysis",
  "control-12": "Log File Analysis",
  "control-13": "Malware Analysis",
  "control-14": "Database Forensics",
  "control-15": "Email Forensics",
  "control-16": "Browser Forensics",
  "control-17": "Expert Reporting",
  "control-18": "Expert Testimony",
  "control-19": "Legal Compliance"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Digital Forensics`,
    description: `Digital Forensics — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
