import type { Metadata } from "next";
import Client from "./network_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  intro: "Introduction",
  ngfw: "Next-Generation Firewalls", dmz: "DMZ Architecture",
  nac: "Network Access Control", waf: "Web Application Firewalls",
  segmentation: "Network Segmentation", acls: "Access Control Lists",
  isolation: "Network Isolation",
  ids: "IDS / IPS", "traffic-analysis": "Traffic Analysis",
  siem: "SIEM Integration", honeypots: "Honeypots & Honeynets",
  vpn: "VPN Solutions", encryption: "Network Encryption",
  wireless: "Wireless Security", protocols: "Protocol Security",
  hardening: "Device Hardening", redundancy: "Network Redundancy",
  "change-mgmt": "Change Management",
  quiz: "Quiz", snippets: "Snippets",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Network Security`,
    description: `Network Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
