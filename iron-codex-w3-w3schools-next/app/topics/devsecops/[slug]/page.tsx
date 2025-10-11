import type { Metadata } from "next";
import Client from "./devsecops_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = { intro: "Introduction" };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Devsecops`,
    description: `Devsecops — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
