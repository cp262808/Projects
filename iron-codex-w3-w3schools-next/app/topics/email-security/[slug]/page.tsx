import type { Metadata } from "next";
import Client from "./email_security_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = { intro: "Introduction" };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Email Security`,
    description: `Email Security — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
