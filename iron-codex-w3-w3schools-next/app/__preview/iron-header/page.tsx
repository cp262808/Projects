'use client';
import React from "react";
import NavBar from "../../../components/IronHeader";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-16 space-y-6">
        <h1 className="text-2xl font-semibold">Header Preview</h1>
        <p>Dropdowns are centered and clamped to the viewport.</p>
        <div className="h-[120vh] rounded-lg border border-slate-800/80" />
      </main>
    </div>
  );
}
