import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deep Dive Guides · Iron Codex",
  description:
    "Comprehensive implementation guides for complex cybersecurity topics — from API security and cloud hardening to incident response and zero trust.",
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
