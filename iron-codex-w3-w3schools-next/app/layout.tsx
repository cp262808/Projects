import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import NavBar from "@/components/IronHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Iron Codex — Cybersecurity Learning Hub",
  description: "Hub for practical security architecture & controls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-white text-slate-900 border px-3 py-2 rounded shadow-lg">Skip to content</a>
        <NavBar /> 
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
