import fs from "fs";
import path from "path";
import { TOPICS_INDEX_DATA_PATH, loadTopicsIndex } from "@/lib/loadTopicsIndex";

const topicsDir = path.join(process.cwd(), "content", "topics");

if (!fs.existsSync(TOPICS_INDEX_DATA_PATH)) {
  console.error("Missing data/topics.json. Run `npm run generate:topics` to rebuild the cache.");
  process.exit(1);
}

const topics = loadTopicsIndex();
const htmlSlugs = fs
  .readdirSync(topicsDir)
  .filter((file) => file.endsWith(".html"))
  .map((file) => path.basename(file, ".html"))
  .sort();

const missingInIndex = htmlSlugs.filter((slug) => !topics.some((topic) => topic.slug === slug));
const extraInIndex = topics
  .map((topic) => topic.slug)
  .filter((slug) => !htmlSlugs.includes(slug));

if (missingInIndex.length > 0 || extraInIndex.length > 0) {
  if (missingInIndex.length > 0) {
    console.error(`Missing topics in data/topics.json: ${missingInIndex.join(", ")}`);
  }
  if (extraInIndex.length > 0) {
    console.error(`Entries without matching HTML exports: ${extraInIndex.join(", ")}`);
  }
  process.exit(1);
}

console.log("All HTML topics are represented in data/topics.json.");
