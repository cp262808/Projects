import { loadTopicsIndex } from "@/lib/loadTopicsIndex";

const topics = loadTopicsIndex({ forceRefresh: true });

console.log(`Generated topics index with ${topics.length} entries.`);
