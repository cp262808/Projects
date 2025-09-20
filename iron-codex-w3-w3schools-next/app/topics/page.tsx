import { loadTopicsIndex } from "@/lib/loadTopicsIndex";
import { TopicsPageClient } from "@/components/topics/TopicsPageClient";

export default function TopicsPage() {
  const topics = loadTopicsIndex();
  return <TopicsPageClient topics={topics} />;
}
