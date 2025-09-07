import { PropsWithChildren } from "react";
export function Steps({ children }: PropsWithChildren) { return <ol className="counter-reset list-none pl-0">{children}</ol>; }
export function Step({ children }: PropsWithChildren) {
  return (
    <li className="relative pl-10 mb-4">
      <span className="absolute left-0 top-0 w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold bg-white">
        <span className="step-num" />
      </span>
      <div className="[&>p:first-child]:mt-0 [&>p:last-child]:mb-0">{children}</div>
    </li>
  );
}
