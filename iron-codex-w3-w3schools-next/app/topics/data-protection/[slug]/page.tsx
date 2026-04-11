import type { Metadata } from "next";
import Client from "./data_protection_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Data Classification Framework",
  "control-2": "Data Labeling",
  "control-3": "PII Identification",
  "control-4": "DLP Implementation",
  "control-5": "Content Inspection",
  "control-6": "Exfiltration Prevention",
  "control-7": "GDPR Compliance",
  "control-8": "CCPA Compliance",
  "control-9": "Privacy Impact Assessments",
  "control-10": "Data Subject Rights",
  "control-11": "Data Inventory",
  "control-12": "Data Lineage",
  "control-13": "Retention Policies",
  "control-14": "Encryption at Rest",
  "control-15": "Encryption in Transit",
  "control-16": "Key Management",
  "control-17": "Access Controls",
  "control-18": "Backup Security"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Data Protection`,
    description: `Data Protection — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
