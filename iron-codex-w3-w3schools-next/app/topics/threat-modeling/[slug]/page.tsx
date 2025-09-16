import type { Metadata } from "next";
import Client from "./threat_modeling_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  intro: "Introduction",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Threat Modeling`,
    description: `Threat Modeling — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug} />;
}
