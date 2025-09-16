import type { Metadata } from "next";
import Client from "./security_awareness_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  intro: "Introduction",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Security Awareness`,
    description: `Security Awareness — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug} />;
}
