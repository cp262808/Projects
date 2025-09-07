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
    const step = Math.max(240, Math.floor(el.clientWidth * 0.6));
    const delta = dir === "left" ? -step : step;
    el.scrollBy({ left: delta, behavior: "smooth" });
    setTimeout(updateArrows, 240);
  };

  const topics = ['API','Cloud','Identity','Containers','Network','SaaS','IR','Crypto','DevSecOps','Threat Intel','Mobile','Web','DB','IoT','AI/ML','Supply','Zero Trust','Compliance','Risk','Arch','Vuln','Pentest'];

  return (
    <header className="sticky top-0 z-50">
      {/* Top white nav — more W3-like spacing/hover */}
      <div className="bg-white border-b">
        <nav className="mx-auto max-w-[1200px] px-4 md:px-5 h-[56px] flex items-center gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0 whitespace-nowrap">
            <img src="/logo-ironcodex.svg" width="28" height="28" alt="Iron Codex" />
            <span className="font-extrabold tracking-tight text-gray-900">Iron Codex</span>
          </Link>

          {/* Primary menu */}
          <ul className="hidden lg:flex items-center text-[15px] font-medium text-gray-800 whitespace-nowrap ml-2">
            {['Tutorials','References','Exercises','Certifications'].map((label)=> (
              <li key={label}>
                <button className="topnav-link">{label} ▾</button>
              </li>
            ))}
          </ul>

          {/* Search */}
          <form action="/search" className="hidden md:flex items-center ml-auto">
            <label className="sr-only" htmlFor="header-search">Search</label>
            <div className="relative">
              <input id="header-search" name="q" type="search" placeholder="Search..." className="rounded-full border border-gray-300 bg-white pl-9 pr-10 w-[240px] md:w-[300px] lg:w-[360px] py-2 leading-5 text-[15px]" />
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
          <ul className="hidden xl:flex items-center gap-1 text-[15px] font-medium text-gray-800 whitespace-nowrap ml-2">
            <li><Link href="/spaces" className="topnav-link">Spaces</Link></li>
            <li><Link href="/teams" className="topnav-link">For Teams</Link></li>
            <li><Link href="/upgrade" className="topnav-link">Upgrade</Link></li>
            <li><Link href="/certified" className="topnav-link">Get Certified</Link></li>
            <li><Link href="/signin" className="ml-2 px-4 py-2 rounded-full bg-[#04AA6D] text-white font-semibold hover:brightness-95">Sign In</Link></li>
          </ul>

          {/* Mobile burger */}
          <button className="md:hidden ml-auto p-2" aria-expanded={open} aria-controls="navmenu" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black"></div>
          </button>
        </nav>
      </div>

      {/* Topics strip with inset ghost arrows + hover shadow */}
      <div className="relative text-white" style={{backgroundColor:"#282A35"}}>
        <div className="relative mx-auto max-w-[1200px] px-4 md:px-5">
          {/* Ghost arrows */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={()=>scrollByAmount("left")}
            className={`topics-arrow-ghost topics-arrow-left-ghost ${canLeft ? "" : "opacity-0 pointer-events-none"}`}
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={()=>scrollByAmount("right")}
            className={`topics-arrow-ghost topics-arrow-right-ghost ${canRight ? "" : "opacity-0 pointer-events-none"}`}
          >
            <span aria-hidden>›</span>
          </button>

          {/* Edge fades */}
          <div className="edge-fade edge-left" aria-hidden="true"></div>
          <div className="edge-fade edge-right" aria-hidden="true"></div>

          {/* Cybersecurity topics */}
          <div
            ref={scrollerRef}
            className="h-12 flex items-center gap-6 md:gap-7 overflow-x-auto uppercase text-[0.98rem] tracking-wide whitespace-nowrap topics-scroll ps-12 pe-12"
          >
            {topics.map((t)=> (
              <Link key={t} href={`/topics/${t.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} className="whitespace-nowrap hover:text-[#04AA6D]">{t}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Component-scoped CSS — no globals edits */}
      <style jsx global>{`
        /* Top nav link like W3 */
        .topnav-link{
          display:inline-flex; align-items:center;
          padding: 10px 12px; border-radius: 6px;
        }
        .topnav-link:hover{ background:#f1f1f1; }

        /* Ghost arrows with hover background "shadow" like W3 */
        .topics-arrow-ghost{
          position:absolute; top:0; bottom:0; width:34px;
          display:flex; align-items:center; justify-content:center;
          color: rgba(255,255,255,.78); z-index:25;
        }
        .topics-arrow-ghost:hover{ color:#fff; }
        .topics-arrow-ghost::before{
          content:""; position:absolute; inset:0;
          background: transparent;
          transition: background .15s ease, box-shadow .15s ease;
        }
        .topics-arrow-ghost:hover::before{
          background: rgba(0,0,0,.10);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), 0 4px 10px rgba(0,0,0,.25);
        }
        .topics-arrow-left-ghost{ left:0; }
        .topics-arrow-right-ghost{ right:0; }

        /* Hide native scrollbar (keep scrollability) */
        .topics-scroll::-webkit-scrollbar { height: 0px; }
        .topics-scroll { scrollbar-width: none; }
        .topics-scroll { -ms-overflow-style: none; }

        /* Edge fades inside container */
        .edge-fade { position:absolute; top:0; bottom:0; width:40px; pointer-events:none; }
        .edge-left { left:0; background: linear-gradient(to right, rgba(40,42,53,1) 20%, rgba(40,42,53,0)); }
        .edge-right { right:0; background: linear-gradient(to left, rgba(40,42,53,1) 20%, rgba(40,42,53,0)); }
      `}</style>
    </header>
  )
}
