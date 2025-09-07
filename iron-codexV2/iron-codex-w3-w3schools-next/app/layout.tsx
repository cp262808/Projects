import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iron Codex — Cybersecurity Learning Hub",
  description: "W3Schools-style hub for practical security architecture & controls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
