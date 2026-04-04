import type { ReactNode } from "react";
import Link from "next/link";

export type PromoFlareProps = {
  label: ReactNode;
  eyebrow?: ReactNode;
  href?: string;
  tone?: "default" | "active";
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  className?: string;
};

export function PromoFlare({
  label,
  eyebrow = "Preview Mode",
  href,
  tone = "default",
  size = "md",
  align = "left",
  className = "",
}: PromoFlareProps) {
  const base = "block w-full rounded-xl border bg-slate-900/60 shadow-inner transition-all";
  const interactiveClass = href
    ? "cursor-pointer hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
    : "select-none cursor-default";
  const toneClass =
    tone === "active"
      ? "border-emerald-400/70 bg-emerald-500/10 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
      : "border-slate-800/70 text-slate-300";
  const sizeClass =
    size === "lg"
      ? "px-5 py-4 text-base"
      : size === "sm"
        ? "px-3 py-2 text-xs"
        : "px-4 py-3 text-sm";
  const alignClass = align === "center" ? "text-center" : "text-left";

  const classes = `${base} ${interactiveClass} ${toneClass} ${sizeClass} ${alignClass} ${className}`.trim();

  const inner = (
    <>
      <div className="font-semibold leading-tight">{label}</div>
      {eyebrow ? (
        <div className="mt-1 text-[10px] uppercase tracking-[0.32em] text-emerald-300/70">{eyebrow}</div>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}

export type PromoBadgeProps = {
  label: ReactNode;
  href?: string;
  tone?: "default" | "active";
  className?: string;
};

export function PromoBadge({
  label,
  href,
  tone = "default",
  className = "",
}: PromoBadgeProps) {
  const base = "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-all";
  const interactiveClass = href
    ? "cursor-pointer hover:brightness-110"
    : "";
  const toneClass =
    tone === "active"
      ? "bg-emerald-500/20 text-emerald-100 border border-emerald-400/70 shadow-[0_0_14px_rgba(16,185,129,0.3)]"
      : "bg-slate-800/60 text-slate-300 border border-slate-700/70";
  const classes = `${base} ${interactiveClass} ${toneClass} ${className}`.trim();

  if (href) {
    return <Link href={href} className={classes}>{label}</Link>;
  }

  return <span className={classes}>{label}</span>;
}
