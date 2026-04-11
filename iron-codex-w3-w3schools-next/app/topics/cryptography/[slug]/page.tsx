import type { Metadata } from "next";
import Client from "./cryptography_client";

type Props = { params: { slug: string } };

const titles: Record<string, string> = {
  "intro": "Introduction",
  "control-1": "Symmetric Encryption",
  "control-2": "Asymmetric Encryption",
  "control-3": "Hybrid Encryption Systems",
  "control-4": "Cryptographic Hash Functions",
  "control-5": "Message Authentication Codes",
  "control-6": "Digital Signatures",
  "control-7": "Key Generation",
  "control-8": "Key Storage",
  "control-9": "Key Rotation",
  "control-10": "Key Escrow",
  "control-11": "Public Key Infrastructure",
  "control-12": "Certificate Management",
  "control-13": "Certificate Validation",
  "control-14": "Secure Coding Practices",
  "control-15": "Side-Channel Attack Protection"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = titles[params.slug] ?? params.slug.replace(/-/g, " ");
  return {
    title: `${name} · Cryptography`,
    description: `Cryptography — ${name} section`,
  };
}

export default function Page({ params }: Props) {
  return <Client slug={params.slug as any} />;
}
