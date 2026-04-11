import type { Metadata } from "next";
import Client from "./api_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Implement OAuth 2.0 / OpenID Connect",
  "control-2": "JWT Token Security",
  "control-3": "API Key Management",
  "control-4": "Fine-Grained Authorization",
  "control-5": "Comprehensive Input Validation",
  "control-6": "Schema Validation",
  "control-7": "SQL Injection Prevention",
  "control-8": "NoSQL Injection Prevention",
  "control-9": "Data Encryption",
  "control-10": "Request Rate Limiting",
  "control-11": "Burst Protection",
  "control-12": "Resource-Based Rate Limits",
  "control-13": "API Gateway Security",
  "control-14": "Load Balancing & Failover",
  "control-15": "API Versioning Security",
  "control-16": "Comprehensive API Logging",
  "control-17": "Real-time Monitoring",
  "control-18": "Anomaly Detection",
  "control-19": "Automated Security Testing",
  "control-20": "Penetration Testing",
  "control-21": "Vulnerability Scanning",
  "control-22": "API Documentation Security",
  "control-23": "Dependency Management"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Api Security`,
    description: `Api Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
