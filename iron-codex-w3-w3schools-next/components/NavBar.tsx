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

  // Click-to-page
  const pageScroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(220, Math.floor(el.clientWidth * 0.5));
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
    setTimeout(updateArrows, 220);
  };

  // Hold-to-scroll (slower)
  const rafRef = useRef<number | null>(null);
  const holdDirRef = useRef<null | "left" | "right">(null);
  const startHold = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    holdDirRef.current = dir;
    const tick = () => {
      if (holdDirRef.current === null) return;
      const speed = Math.max(3, Math.floor(el.clientWidth * 0.006));
      el.scrollLeft += (holdDirRef.current === "left" ? -speed : speed);
      updateArrows();
      rafRef.current = requestAnimationFrame(tick);
    };
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  };
  const stopHold = () => {
    holdDirRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const topics = ['API','Cloud','Identity','Containers','Network','SaaS','IR','Crypto','DevSecOps','Threat Intel','Mobile','Web','DB','IoT','AI/ML','Supply','Zero Trust','Compliance','Risk','Arch','Vuln','Pentest'];

  return (
    <header className="sticky top-0 z-50">
      {/* Top white nav — wider but centered */}
      <div className="bg-white border-b">
        <nav className="mx-auto max-w-[1680px] px-5 md:px-6 h-[56px] flex items-stretch gap-0">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0 whitespace-nowrap pr-2">
            <img src="/logo-ironcodex.svg" width="28" height="28" alt="Iron Codex" />
            <span className="font-extrabold tracking-tight text-gray-900">Iron Codex</span>
          </Link>

          {/* Primary menu (flush buttons) */}
          <ul className="hidden lg:flex items-stretch gap-0 text-[14.5px] font-medium text-gray-800 whitespace-nowrap">
            {['Tutorials','References','Exercises','Certifications'].map((label)=> (
              <li key={label} className="h-full">
                <button className="topnav-link h-full">{label} ▾</button>
              </li>
            ))}
          </ul>

          {/* Spacer */}
          <div className="flex-1 min-w-[8px]" />

          {/* Search */}
          <form action="/search" className="hidden md:flex items-stretch h-full">
            <label className="sr-only" htmlFor="header-search">Search</label>
            <div className="relative my-auto">
              <input id="header-search" name="q" type="search" placeholder="Search..." className="rounded-full border border-gray-300 bg-white pl-9 pr-10 w-[240px] md:w-[320px] lg:w-[360px] py-2 leading-5 text-[14.5px]" />
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

          {/* Utility links (flush) */}
          <ul className="hidden xl:flex items-stretch gap-0 text-[14.5px] font-medium text-gray-800 whitespace-nowrap pl-2">
            {['Spaces','For Teams','Upgrade','Get Certified'].map((label)=> (
              <li key={label} className="h-full">
                <Link href={`/${label.toLowerCase().replace(/\s+/g,'-')}`} className="topnav-link h-full">{label}</Link>
              </li>
            ))}
            <li className="h-full">
              <Link href="/signin" className="px-4 inline-flex items-center h-full rounded-full bg-[#04AA6D] text-white font-semibold hover:brightness-95 ml-2">Sign In</Link>
            </li>
          </ul>

          {/* Mobile burger */}
          <button className="md:hidden ml-2 p-2 my-auto" aria-expanded={open} aria-controls="navmenu" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black mb-1"></div>
            <div className="w-6 h-[2px] bg-black"></div>
          </button>
        </nav>
      </div>

      {/* Topics strip — wider container, arrows visually touching chips */}
      <div className="relative text-white" style={{backgroundColor:"#282A35"}}>
        <div className="relative mx-auto max-w-[1680px] px-5 md:px-6">
          {/* Arrows */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={()=>pageScroll("left")}
            onMouseDown={()=>startHold("left")}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={()=>startHold("left")}
            onTouchEnd={stopHold}
            className={`topics-arrow-ghost topics-arrow-left-ghost ${canLeft ? "" : "opacity-0 pointer-events-none"}`}
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={()=>pageScroll("right")}
            onMouseDown={()=>startHold("right")}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={()=>startHold("right")}
            onTouchEnd={stopHold}
            className={`topics-arrow-ghost topics-arrow-right-ghost ${canRight ? "" : "opacity-0 pointer-events-none"}`}
          >
            <span aria-hidden>›</span>
          </button>

          {/* Edge fades UNDER the chips so the first/last aren't dimmed */}
          <div className="edge-fade edge-left" aria-hidden="true"></div>
          <div className="edge-fade edge-right" aria-hidden="true"></div>

          {/* Chips: no side padding so first/last sit right next to arrow zones */}
          <div
            ref={scrollerRef}
            className="h-[48px] flex items-center gap-4 overflow-x-auto uppercase text-[0.88rem] tracking-wide whitespace-nowrap topics-scroll ps-0 pe-0 relative z-[30]"
          >
            {topics.map((t)=> (
              <Link
                key={t}
                href={`/topics/${t.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`}
                className="topics-chip hover:text-[#04AA6D]"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scoped CSS */}
      <style jsx global>{`
        /* Top nav link: flush side-by-side (no rounding to avoid visual gaps) */
        .topnav-link{ display:inline-flex; align-items:center; padding: 0 10px; border-radius: 0; height: 100%; }
        .topnav-link:hover{ background:#f1f1f1; }

        /* Ghost arrows + hover background/shadow */
        .topics-arrow-ghost{ position:absolute; top:0; bottom:0; width:28px; display:flex; align-items:center; justify-content:center; color: rgba(255,255,255,.78); z-index:35; }
        .topics-arrow-ghost:hover{ color:#fff; }
        .topics-arrow-ghost::before{ content:""; position:absolute; inset:0; background: transparent; transition: background .15s ease, box-shadow .15s ease; }
        .topics-arrow-ghost:hover::before{ background: rgba(0,0,0,.10); box-shadow: inset 0 0 0 1px rgba(255,255,255,.10), 0 4px 10px rgba(0,0,0,.25); }
        .topics-arrow-left-ghost{ left:0; }
        .topics-arrow-right-ghost{ right:0; }

        /* Hide native scrollbar (keep scrollability) */
        .topics-scroll::-webkit-scrollbar { height: 0px; }
        .topics-scroll { scrollbar-width: none; }
        .topics-scroll { -ms-overflow-style: none; }

        /* Edge fades: positioned AFTER arrow zones, z-index below chips so chips never look faded */
        .edge-fade { position:absolute; top:0; bottom:0; width:28px; pointer-events:none; z-index:20; }
        .edge-left { left:28px; background: linear-gradient(to right, rgba(40,42,53,1) 20%, rgba(40,42,53,0)); }
        .edge-right { right:28px; background: linear-gradient(to left, rgba(40,42,53,1) 20%, rgba(40,42,53,0)); }

        /* Topic chips: hover-only shadow; tighter padding */
        .topics-chip{ display:inline-flex; align-items:center; padding: 6px 9px; border-radius: 8px; transition: box-shadow .15s ease, background .15s ease, color .15s ease; position:relative; z-index:30; }
        .topics-chip:hover{ box-shadow: 0 4px 12px rgba(0,0,0,.24); background: rgba(255,255,255,.03); }
      `}</style>
    </header>
  )
}
