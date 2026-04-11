import type { Metadata } from "next";
import Client from "./cloud_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  intro: "Introduction",
  "cloud-iam": "Cloud IAM", "cloud-mfa": "Multi-Factor Authentication", "service-accounts": "Service Accounts", "cross-account": "Cross-Account Access",
  "vpc-security": "VPC Security", "network-segmentation": "Network Segmentation", "cloud-vpn": "VPN & Connectivity", "cloud-waf": "Web App Firewall",
  "encryption-at-rest": "Encryption at Rest", "encryption-in-transit": "Encryption in Transit", "key-management": "Key Management", "data-classification": "Data Classification",
  "instance-hardening": "Instance Hardening", "container-security": "Container Security", "serverless-security": "Serverless Security",
  "object-storage": "Object Storage", "database-security": "Database Security", "backup-security": "Backup Security",
  "cloud-trail": "Cloud Trail Logging", "security-monitoring": "Security Monitoring", "log-analysis-siem": "Log Analysis & SIEM",
  "compliance-framework": "Compliance Framework", "config-management": "Config Management", "security-assessment": "Security Assessment",
  quiz: "Quiz", snippets: "Snippets",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Cloud Security`,
    description: `Cloud Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
