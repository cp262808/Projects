import type { Metadata } from "next";
import Client from "./endpoint_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "EDR Implementation",
  "control-2": "Behavioral Analysis",
  "control-3": "Threat Hunting",
  "control-4": "Next-Generation Antivirus",
  "control-5": "Anti-Malware",
  "control-6": "Sandboxing",
  "control-7": "Device Encryption",
  "control-8": "Secure Boot",
  "control-9": "Device Hardening",
  "control-10": "Automated Patching",
  "control-11": "Vulnerability Assessment",
  "control-12": "Patch Testing",
  "control-13": "User Account Control",
  "control-14": "Application Control",
  "control-15": "USB and Removable Media Control",
  "control-16": "Network Access Control"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Endpoint Security`,
    description: `Endpoint Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
