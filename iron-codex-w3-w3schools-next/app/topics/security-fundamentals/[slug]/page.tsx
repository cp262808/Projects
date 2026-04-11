import type { Metadata } from "next";
import Client from "./security_fundamentals_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  intro: "Introduction",
  "cia-triad": "CIA Triad", "defense-in-depth": "Defense in Depth", "least-privilege": "Least Privilege", "security-by-design": "Security by Design",
  "risk-assessments": "Risk Assessments", "risk-treatment": "Risk Treatment Plans", "risk-monitoring": "Risk Monitoring",
  "security-policies": "Security Policies", "awareness-training": "Awareness Training", "compliance-framework": "Compliance Framework", "security-audits": "Security Audits", "security-metrics": "Security Metrics",
  quiz: "Quiz", snippets: "Snippets",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Security Fundamentals`,
    description: `Security Fundamentals — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
