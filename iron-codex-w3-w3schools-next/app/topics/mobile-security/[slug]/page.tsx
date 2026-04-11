import type { Metadata } from "next";
import Client from "./mobile_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Mobile Device Management (MDM)",
  "control-2": "Device Encryption",
  "control-3": "Remote Wipe Capabilities",
  "control-4": "Jailbreak/Root Detection",
  "control-5": "App Store Controls",
  "control-6": "Mobile App Security Testing",
  "control-7": "Runtime Application Protection",
  "control-8": "Code Obfuscation",
  "control-9": "VPN Configuration",
  "control-10": "Certificate Pinning",
  "control-11": "Public Wi-Fi Protection",
  "control-12": "BYOD Policy Implementation",
  "control-13": "Containerization",
  "control-14": "Mobile Threat Defense"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Mobile Security`,
    description: `Mobile Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
