import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iron Codex — Cybersecurity Learning Hub",
  description: "W3Schools-style hub for practical security architecture & controls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white border px-3 py-2 rounded">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
