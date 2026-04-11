import type { Metadata } from "next";
import Client from "./container_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Image Vulnerability Scanning",
  "control-2": "Base Image Security",
  "control-3": "Image Signing",
  "control-4": "Registry Security",
  "control-5": "Container Runtime Hardening",
  "control-6": "Security Contexts",
  "control-7": "Resource Limits",
  "control-8": "Runtime Monitoring",
  "control-9": "RBAC Implementation",
  "control-10": "Pod Security Standards",
  "control-11": "Network Policies",
  "control-12": "API Server Security",
  "control-13": "Secrets Management",
  "control-14": "Configuration Security",
  "control-15": "Environment Isolation",
  "control-16": "Audit Logging",
  "control-17": "Compliance Scanning",
  "control-18": "Incident Response",
  "control-19": "Backup and Recovery"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Container Security`,
    description: `Container Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
