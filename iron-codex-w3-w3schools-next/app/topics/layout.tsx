import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Topics · Iron Codex",
  description:
    "Comprehensive coverage of cybersecurity domains — from security fundamentals and IAM to cloud security, AppSec, and incident response.",
};

export default function TopicsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
