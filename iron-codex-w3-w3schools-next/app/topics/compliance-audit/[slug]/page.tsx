import type { Metadata } from "next";
import Client from "./compliance_audit_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  intro: "Introduction",
  "req-assessment": "Regulatory Requirements Assessment", "program-mgmt": "Compliance Program Management", "policy-dev": "Policy and Procedure Development",
  "control-design": "Control Design and Implementation", "control-testing": "Control Testing and Validation", "remediation": "Remediation Management",
  "internal-audit": "Internal Audit Program", "external-audit": "External Audit Coordination", "evidence-mgmt": "Evidence Management", "audit-response": "Audit Response Management",
  "compliance-mon": "Compliance Monitoring", "compliance-rep": "Compliance Reporting", "metrics-kpi": "Metrics and KPIs", "risk-integration": "Risk Assessment Integration", "training-awareness": "Training and Awareness",
  frameworks: "Key Compliance Frameworks",
  quiz: "Quiz",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Compliance Audit`,
    description: `Compliance Audit — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
