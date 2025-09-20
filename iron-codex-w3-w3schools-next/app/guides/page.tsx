import GuidesIndex from "@/components/guides/GuidesIndex";
import { loadGuidesIndex } from "@/lib/loadGuidesIndex";

export default function GuidesPage() {
  const guides = loadGuidesIndex();
  return <GuidesIndex guides={guides} />;
}
