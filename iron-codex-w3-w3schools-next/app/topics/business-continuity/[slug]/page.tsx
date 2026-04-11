import type { Metadata } from "next";
import Client from "./business_continuity_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Business Impact Analysis (BIA)",
  "control-2": "Risk Assessment and Analysis",
  "control-3": "Business Continuity Strategy",
  "control-4": "Disaster Recovery Planning",
  "control-5": "Backup and Recovery Systems",
  "control-6": "Alternative Site Management",
  "control-7": "Crisis Management Team",
  "control-8": "Emergency Communication",
  "control-9": "Stakeholder Management",
  "control-10": "Plan Testing and Exercises",
  "control-11": "Plan Maintenance and Updates",
  "control-12": "Training and Awareness"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Business Continuity`,
    description: `Business Continuity — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
