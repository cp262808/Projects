import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Tools · Iron Codex",
  description:
    "Curated collection of essential cybersecurity tools — vulnerability scanners, SIEM platforms, container security, and more.",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
