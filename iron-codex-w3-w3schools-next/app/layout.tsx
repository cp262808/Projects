import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import NavBar from "@/components/IronHeader";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Iron Codex — Cybersecurity Learning Hub",
  description: "Hub for practical security architecture & controls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-slate-900 border px-3 py-2 rounded shadow-lg z-[100]"
        >
          Skip to content
        </a>
        <NavBar /> 
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
