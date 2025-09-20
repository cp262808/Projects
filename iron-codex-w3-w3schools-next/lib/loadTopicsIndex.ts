import fs from "fs";
import path from "path";
import {
  TopicsIndexSchema,
  type TopicIndexEntry,
  type TopicsIndex
} from "@/schemas/topics-index";

const TOPICS_CONTENT_DIR = path.join(process.cwd(), "content", "topics");
export const TOPICS_INDEX_DATA_PATH = path.join(process.cwd(), "data", "topics.json");

let inMemoryCache: TopicsIndex | null = null;

export interface LoadTopicsIndexOptions {
  forceRefresh?: boolean;
}

export function loadTopicsIndex(options: LoadTopicsIndexOptions = {}): TopicsIndex {
  const { forceRefresh = false } = options;

  if (inMemoryCache && !forceRefresh) {
    return inMemoryCache;
  }

  if (!forceRefresh && fs.existsSync(TOPICS_INDEX_DATA_PATH)) {
    const raw = fs.readFileSync(TOPICS_INDEX_DATA_PATH, "utf-8");
    const parsed = TopicsIndexSchema.parse(JSON.parse(raw));
    inMemoryCache = parsed;
    return parsed;
  }

  const entries = TopicsIndexSchema.parse(parseTopicsDirectory());

  fs.mkdirSync(path.dirname(TOPICS_INDEX_DATA_PATH), { recursive: true });
  fs.writeFileSync(TOPICS_INDEX_DATA_PATH, JSON.stringify(entries, null, 2));

  inMemoryCache = entries;
  return entries;
}

function parseTopicsDirectory(): TopicIndexEntry[] {
  const files = fs
    .readdirSync(TOPICS_CONTENT_DIR)
    .filter((file) => file.endsWith(".html"))
    .sort();

  return files.map((file) => parseTopicFile(path.join(TOPICS_CONTENT_DIR, file)));
}

function parseTopicFile(filePath: string): TopicIndexEntry {
  const slug = path.basename(filePath, ".html");
  const html = fs.readFileSync(filePath, "utf-8");

  const titleMatch = html.match(/<h1>([^<]+)<\/h1>/i);
  if (!titleMatch) {
    throw new Error(`Missing <h1> for topic: ${slug}`);
  }

  const metaMatches = [...html.matchAll(/<span class="meta-item">([^<]+)<\/span>/gi)];
  if (metaMatches.length < 3) {
    throw new Error(`Missing meta information for topic: ${slug}`);
  }

  const [controlsText, levelText, categoryText] = metaMatches.map((match) => match[1].trim());

  const controlsMatch = controlsText.match(/(\d+)/);
  if (!controlsMatch) {
    throw new Error(`Unable to parse control count for topic: ${slug}`);
  }
  const controls = Number.parseInt(controlsMatch[1], 10);

  const level = levelText.replace(/\s*Level$/i, "").trim();
  const category = categoryText.trim();

  const summaryMatch = html.match(/<p class="topic-intro">([\s\S]*?)<\/p>/i);
  const summary = summaryMatch ? normalizeWhitespace(summaryMatch[1]) : undefined;

  return {
    slug,
    title: titleMatch[1].trim(),
    controls,
    level,
    category,
    summary
  };
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
