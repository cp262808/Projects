"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function NavBar(){
  const [open, setOpen] = useState(false);

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
        <nav className="mx-auto max-w-[1200px] px-5 flex items-center gap-3 h-14">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0 whitespace-nowrap">
            <img src="/logo-ironcodex.svg" width="28" height="28" alt="Iron Codex" />
            <span className="font-extrabold tracking-tight text-gray-900">Iron Codex</span>
          </Link>

          {/* Primary nav */}
          <ul className="hidden lg:flex items-center gap-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            <li><button className="px-3 py-2 rounded hover:bg-gray-100">Guides ▾</button></li>
            <li><button className="px-3 py-2 rounded hover:bg-gray-100">References ▾</button></li>
            <li><button className="px-3 py-2 rounded hover:bg-gray-100">Examples ▾</button></li>
            <li><button className="px-3 py-2 rounded hover:bg-gray-100">Certifications ▾</button></li>
          </ul>

          {/* Search */}
          <form action="/search" className="hidden md:flex items-center ml-auto">
            <label className="sr-only" htmlFor="header-search">Search</label>
            <div className="relative">
              <input id="header-search" name="q" type="search" placeholder="Search..." className="rounded-full border border-gray-300 bg-white pl-9 pr-10 w-[240px] md:w-[300px] lg:w-[360px] py-2 leading-5" />
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
          <ul className="hidden xl:flex items-center gap-4 text-sm font-medium text-gray-700 whitespace-nowrap ml-2">
            <li><Link href="/spaces" className="hover:underline">Spaces</Link></li>
            <li><Link href="/teams" className="hover:underline">For Teams</Link></li>
            <li><Link href="/upgrade" className="hover:underline">Upgrade</Link></li>
            <li><Link href="/certified" className="hover:underline">Get Certified</Link></li>
            <li><Link href="/signin" className="rounded-full px-4 py-2 font-semibold border border-gray-300 hover:bg-gray-50">Sign In</Link></li>
          </ul>

          {/* Mobile */}
          <button className="md:hidden ml-auto p-2" aria-expanded={open} aria-controls="navmenu" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black"></div>
          </button>
        </nav>
      </div>

      {/* Topics strip with ghost arrows (inset to container) */}
      <div className="relative text-white" style={{backgroundColor:"#282A35"}}>
        {/* The container wrapper is *relative*; arrows and fades are positioned within it */}
        <div className="relative mx-auto max-w-[1200px] px-5">
          {/* Ghost arrows */}
          <button type="button" aria-label="Scroll left" onClick={()=>scrollByAmount("left")} className={`topics-arrow-ghost topics-arrow-left-ghost ${canLeft ? "" : "opacity-0 pointer-events-none"}`}>
            <span aria-hidden>‹</span>
          </button>
          <button type="button" aria-label="Scroll right" onClick={()=>scrollByAmount("right")} className={`topics-arrow-ghost topics-arrow-right-ghost ${canRight ? "" : "opacity-0 pointer-events-none"}`}>
            <span aria-hidden>›</span>
          </button>

          {/* Edge fades, also inside container */}
          <div className="edge-fade edge-left" aria-hidden="true"></div>
          <div className="edge-fade edge-right" aria-hidden="true"></div>

          {/* Scrollable topics */}
          <div ref={scrollerRef} className="h-10 flex items-center gap-4 md:gap-5 overflow-x-auto uppercase text-xs tracking-wide whitespace-nowrap topics-scroll ps-8 pe-8">
            {['HTML','CSS','JAVASCRIPT','SQL','PYTHON','JAVA','PHP','HOW TO','W3.CSS','C','C++','C#','BOOTSTRAP','REACT','MYSQL','JQUERY','EXCEL','XML','DJANGO','NUMPY','PANDAS','NODEJS','DSA'].map((t)=> (
              <Link key={t} href="#" className="whitespace-nowrap hover:text-[#04AA6D]">{t}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Component-scoped CSS so you don't need globals changes */}
      <style jsx global>{`
        .topics-arrow-ghost{ position:absolute; top:0; bottom:0; width:28px; display:flex; align-items:center; justify-content:center; color: rgba(255,255,255,.75); z-index:25; }
        .topics-arrow-ghost:hover{ color:#fff; }
        .topics-arrow-left-ghost{ left:0; }
        .topics-arrow-right-ghost{ right:0; }

        .topics-scroll::-webkit-scrollbar { height: 0px; }
        .topics-scroll { scrollbar-width: none; }
        .topics-scroll { -ms-overflow-style: none; }

        .edge-fade { position:absolute; top:0; bottom:0; width:36px; pointer-events:none; }
        .edge-left { left:0; background: linear-gradient(to right, rgba(40,42,53,1) 20%, rgba(40,42,53,0)); }
        .edge-right { right:0; background: linear-gradient(to left, rgba(40,42,53,1) 20%, rgba(40,42,53,0)); }
      `}</style>
    </header>
  )
}
