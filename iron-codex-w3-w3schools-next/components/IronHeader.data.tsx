'use client';
import React, { useState } from "react";
import nav from "@/data/nav.json";
import { PromoBadge } from "./PromoFlare";

export default function NavBar(){
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = (nav?.items || []).slice(0, 20);
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <PromoBadge label="Iron Codex" tone="active" className="text-base" />
        <nav className="hidden md:flex gap-3">
          {items.map((it) => (
            <PromoBadge key={it.href} label={it.label} className="px-4 py-2" />
          ))}
        </nav>
        <button className="md:hidden px-3 py-1.5 rounded" onClick={()=>setMobileOpen(v=>!v)}>Menu</button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 p-2">
          <div className="space-y-2">
            {(nav?.items || []).map((it)=>(
              <PromoBadge key={it.href} label={it.label} className="w-full justify-center" />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
