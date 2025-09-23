import type { ReactNode } from "react";

export type PromoFlareProps = {
  label: ReactNode;
  eyebrow?: ReactNode;
  tone?: "default" | "active";
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  className?: string;
};

export function PromoFlare({
  label,
  eyebrow = "Preview Mode",
  tone = "default",
  size = "md",
  align = "left",
  className = "",
}: PromoFlareProps) {
  const base = "w-full select-none cursor-default rounded-xl border bg-slate-900/60 shadow-inner";
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

  return (
    <div className={`${base} ${toneClass} ${sizeClass} ${alignClass} ${className}`.trim()}>
      <div className="font-semibold leading-tight">{label}</div>
      {eyebrow ? (
        <div className="mt-1 text-[10px] uppercase tracking-[0.32em] text-emerald-300/70">{eyebrow}</div>
      ) : null}
    </div>
  );
}

export function PromoBadge({
  label,
  tone = "default",
  className = "",
}: {
  label: ReactNode;
  tone?: "default" | "active";
  className?: string;
}) {
  const base = "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide";
  const toneClass =
    tone === "active"
      ? "bg-emerald-500/20 text-emerald-100 border border-emerald-400/70 shadow-[0_0_14px_rgba(16,185,129,0.3)]"
      : "bg-slate-800/60 text-slate-300 border border-slate-700/70";
  return <span className={`${base} ${toneClass} ${className}`.trim()}>{label}</span>;
}
