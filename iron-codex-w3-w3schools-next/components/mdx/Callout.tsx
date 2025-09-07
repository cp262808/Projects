import { PropsWithChildren } from "react";
type Variant = "info" | "warn" | "success" | "danger";
const styles: Record<Variant, string> = {
  info: "border-sky-400 bg-sky-50",
  warn: "border-amber-400 bg-amber-50",
  success: "border-emerald-400 bg-emerald-50",
  danger: "border-rose-400 bg-rose-50",
};
export default function Callout({ children, type = "info", title }: PropsWithChildren<{ type?: Variant, title?: string }>) {
  const cls = styles[type] || styles.info;
  return (
    <div className={`my-4 border-l-4 ${cls} px-4 py-3 rounded`}>
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div className="[&>p]:m-0">{children}</div>
    </div>
  );
}
