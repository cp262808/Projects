"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function NavBar(){
  const [open, setOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);

  // Topics scroller state
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 2);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(220, Math.floor(el.clientWidth * 0.6));
    const delta = dir === "left" ? -step : step;
    el.scrollBy({ left: delta, behavior: "smooth" });
    setTimeout(updateArrows, 240);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top white nav */}
      <div className="bg-white border-b">
        <nav className="nav-wrap">
          {/* Logo + brand */}
          <Link href="/" className="nav-brand">
            <img src="/logo-ironcodex.svg" width="28" height="28" alt="Iron Codex" className="inline-block" />
            <span className="font-extrabold tracking-tight text-gray-900">Iron Codex</span>
          </Link>

          {/* Primary nav (spaced, non-wrapping) */}
          <ul className="nav-primary">
            <li><button className="nav-link" onMouseEnter={()=>setOpenMega("guides")} onFocus={()=>setOpenMega("guides")} onMouseLeave={()=>setOpenMega(null)}>Guides ▾</button></li>
            <li><button className="nav-link" onMouseEnter={()=>setOpenMega("refs")} onFocus={()=>setOpenMega("refs")} onMouseLeave={()=>setOpenMega(null)}>References ▾</button></li>
            <li><button className="nav-link" onMouseEnter={()=>setOpenMega("examples")} onFocus={()=>setOpenMega("examples")} onMouseLeave={()=>setOpenMega(null)}>Examples ▾</button></li>
            <li><button className="nav-link" onMouseEnter={()=>setOpenMega("certs")} onFocus={()=>setOpenMega("certs")} onMouseLeave={()=>setOpenMega(null)}>Certifications ▾</button></li>
          </ul>

          {/* Compact search */}
          <form action="/search" className="nav-search">
            <label className="sr-only" htmlFor="header-search">Search</label>
            <div className="relative">
              <input id="header-search" name="q" type="search" placeholder="Search..." />
              <svg aria-hidden className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900" aria-label="Search">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </form>

          {/* Utility links */}
          <ul className="nav-utils ml-2">
            <li><Link href="/spaces" className="hover:underline">Spaces</Link></li>
            <li><Link href="/teams" className="hover:underline">For Teams</Link></li>
            <li><Link href="/upgrade" className="hover:underline">Upgrade</Link></li>
            <li><Link href="/certified" className="hover:underline">Get Certified</Link></li>
            <li><Link href="/signin" className="btn btn-pill border border-gray-300 hover:bg-gray-50">Sign In</Link></li>
          </ul>

          {/* Mobile menu toggle */}
          <button className="nav-mobile" aria-expanded={open} aria-controls="navmenu" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black"></div>
          </button>
        </nav>
      </div>

      {/* Dark topics strip with W3-like ghost arrows */}
      <div className="relative bg-[#282A35] text-white">
        <div className="relative">
          {/* Ghost arrows (no button chrome) */}
          <button type="button" aria-label="Scroll left" onClick={()=>scrollByAmount("left")} className={`topics-arrow-ghost topics-arrow-left-ghost ${canLeft ? "" : "opacity-0 pointer-events-none"}`}>
            <span aria-hidden>‹</span>
          </button>
          <button type="button" aria-label="Scroll right" onClick={()=>scrollByAmount("right")} className={`topics-arrow-ghost topics-arrow-right-ghost ${canRight ? "" : "opacity-0 pointer-events-none"}`}>
            <span aria-hidden>›</span>
          </button>

          {/* Edge fades */}
          <div className="edge-fade edge-left" aria-hidden="true"></div>
          <div className="edge-fade edge-right" aria-hidden="true"></div>

          {/* Scrollable topics */}
          <div ref={scrollerRef} className="topics-strip topics-scroll topics-pad">
            {['HTML','CSS','JAVASCRIPT','SQL','PYTHON','JAVA','PHP','HOW TO','W3.CSS','C','C++','C#','BOOTSTRAP','REACT','MYSQL','JQUERY','EXCEL','XML','DJANGO','NUMPY','PANDAS','NODEJS','DSA'].map((t)=> (
              <Link key={t} href="#" className="topics-item">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
