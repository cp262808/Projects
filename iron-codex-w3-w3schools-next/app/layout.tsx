import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import NavBar from "@/components/IronHeader";

export const metadata: Metadata = {
  title: "Iron Codex — Cybersecurity Learning Hub",
  description: "Hub for practical security architecture & controls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <span className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white border px-3 py-2 rounded">Skip to content</span>
        <NavBar /> 
        {children}
        <Analytics />
      </body>
    </html>
  );
}
