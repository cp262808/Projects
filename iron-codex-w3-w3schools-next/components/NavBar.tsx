"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar(){
  const [open, setOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      {/* Top white nav */}
      <div className="bg-white border-b">
        <nav className="container flex items-center gap-3 h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-w3green text-2xl leading-none">🛡️</span>
            <span className="font-extrabold tracking-tight text-gray-900">Iron Codex</span>
          </Link>

          {/* Primary nav like W3 (our content) */}
          <ul className="hidden md:flex items-center text-sm font-medium text-gray-700">
            <li className="relative group">
              <button
                className="px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-1"
                onMouseEnter={()=>setOpenMega("guides")}
                onFocus={()=>setOpenMega("guides")}
                onMouseLeave={()=>setOpenMega(null)}
              >
                Guides <span className="inline-block">▾</span>
              </button>
            </li>
            <li className="relative group">
              <button
                className="px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-1"
                onMouseEnter={()=>setOpenMega("refs")}
                onFocus={()=>setOpenMega("refs")}
                onMouseLeave={()=>setOpenMega(null)}
              >
                References <span className="inline-block">▾</span>
              </button>
            </li>
            <li className="relative group">
              <button
                className="px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-1"
                onMouseEnter={()=>setOpenMega("examples")}
                onFocus={()=>setOpenMega("examples")}
                onMouseLeave={()=>setOpenMega(null)}
              >
                Examples <span className="inline-block">▾</span>
              </button>
            </li>
            <li className="relative group">
              <button
                className="px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-1"
                onMouseEnter={()=>setOpenMega("certs")}
                onFocus={()=>setOpenMega("certs")}
                onMouseLeave={()=>setOpenMega(null)}
              >
                Certifications <span className="inline-block">▾</span>
              </button>
            </li>
          </ul>

          {/* Compact search box in header */}
          <form action="/search" className="hidden lg:flex items-center ml-auto">
            <label className="sr-only" htmlFor="header-search">Search</label>
            <div className="relative">
              <input id="header-search" name="q" type="search" placeholder="Search..." className="input-pill pl-9 pr-9" />
              <svg aria-hidden className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <button className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900" aria-label="Search">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </form>

          {/* Right side links */}
          <ul className="hidden lg:flex items-center text-sm font-medium text-gray-700 gap-4 ml-4">
            <li><Link href="/spaces" className="hover:underline">Spaces</Link></li>
            <li><Link href="/teams" className="hover:underline">For Teams</Link></li>
            <li><Link href="/upgrade" className="hover:underline">Upgrade</Link></li>
            <li><Link href="/certified" className="hover:underline">Get Certified</Link></li>
            <li><Link href="/signin" className="btn btn-pill border border-gray-300 hover:bg-gray-50">Sign In</Link></li>
          </ul>

          <button
            className="md:hidden ml-auto p-2"
            aria-expanded={open}
            aria-controls="navmenu"
            onClick={()=>setOpen(v=>!v)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black"></div>
          </button>
        </nav>
      </div>

      {/* Dark topics strip */}
      <div className="bg-w3dark text-white">
        <div className="container h-10 flex items-center gap-5 overflow-x-auto uppercase text-xs tracking-wide">
          {['API','Cloud','Identity','Containers','Network','SaaS','IR','Crypto','DevSecOps','Threat Intel','Mobile','Web','DB','IoT','AI/ML','Supply','Zero Trust','Compliance','Risk','Arch','Vuln','Pentest'].map((t)=> (
            <Link key={t} href="#" className="hover:text-w3green whitespace-nowrap">{t}</Link>
          ))}
          <span className="text-gray-400">›</span>
        </div>
      </div>
    </header>
  )
}
