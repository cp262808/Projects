import { PropsWithChildren } from "react";
export default function Badge({ children }: PropsWithChildren) {
  return <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-w3yellow text-black align-middle">{children}</span>;
}
