import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search · Iron Codex",
  description:
    "Search topics, guides, and tools across the Iron Codex cybersecurity knowledge base.",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
