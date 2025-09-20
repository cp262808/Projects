import fs from "fs";
import path from "path";
import { load } from "cheerio";
import {
  GuidesIndexSchema,
  GuideSummary,
  GuideSummarySchema,
  GuideDifficulty
} from "@/schemas/guide";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");
const DATA_FILE = path.join(process.cwd(), "data", "guides.json");

const DIFFICULTY_MAP: Record<string, GuideDifficulty> = {
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Expert: "Expert"
};

function normaliseDifficulty(raw: string): GuideDifficulty {
  const cleaned = raw
    .replace(/level/i, "")
    .replace(/difficulty/i, "")
    .trim();
  const formatted = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  const match = DIFFICULTY_MAP[formatted as keyof typeof DIFFICULTY_MAP];
  if (!match) {
    throw new Error(`Unknown guide difficulty: ${raw}`);
  }
  return match;
}

function extractReadTime(text: string): { minutes: number; label: string } {
  if (!text.trim()) {
    return { minutes: 1, label: "1 min read" };
  }
  const words = text.trim().split(/\s+/).filter(Boolean);
  const minutes = Math.max(1, Math.round(words.length / 200));
  return { minutes, label: `${minutes} min read` };
}

function parseGuideFile(filePath: string): GuideSummary {
  const slug = path.basename(filePath, path.extname(filePath));
  const html = fs.readFileSync(filePath, "utf-8");
  const $ = load(html);

  const title = $("main.guide-content h1").first().text().trim()
    || $("title").first().text().replace(/-\s*Iron Codex$/i, "").trim();

  const metaItems = $(".guide-meta .meta-item");
  const controlCountText = metaItems.eq(0).text();
  const controlCountMatch = controlCountText.match(/(\d+)/);
  if (!controlCountMatch) {
    throw new Error(`Unable to parse control count for guide ${slug}`);
  }
  const controlCount = parseInt(controlCountMatch[1], 10);

  const difficultyText = metaItems.eq(1).text();
  const difficulty = normaliseDifficulty(difficultyText);

  const lastUpdatedText = metaItems.eq(2).text();
  const lastUpdated = lastUpdatedText.replace(/Last Updated:\s*/i, "").trim() || undefined;

  const summary = $(".guide-intro").first().text().trim()
    || $('meta[name="description"]').attr("content")?.trim()
    || "";

  if (!summary) {
    throw new Error(`Unable to determine summary for guide ${slug}`);
  }

  const bodyText = $("main.guide-content").text();
  const { minutes, label } = extractReadTime(bodyText);

  return GuideSummarySchema.parse({
    slug,
    title,
    controlCount,
    difficulty,
    summary,
    readTimeMinutes: minutes,
    readTime: label,
    lastUpdated
  });
}

function shouldUseCache(htmlFiles: string[]): boolean {
  if (!fs.existsSync(DATA_FILE)) {
    return false;
  }
  const cacheStat = fs.statSync(DATA_FILE);
  const cacheTime = cacheStat.mtimeMs;
  const newestSource = htmlFiles.reduce((latest, file) => {
    const stat = fs.statSync(path.join(GUIDES_DIR, file));
    return Math.max(latest, stat.mtimeMs);
  }, 0);

  return cacheTime >= newestSource;
}

function readCache(): GuideSummary[] | null {
  if (!fs.existsSync(DATA_FILE)) {
    return null;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return GuidesIndexSchema.parse(parsed);
  } catch (error) {
    return null;
  }
}

function writeCache(guides: GuideSummary[]): void {
  if (process.env.NODE_ENV === "test") {
    return;
  }
  const dataDir = path.dirname(DATA_FILE);
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(guides, null, 2));
}

export function loadGuidesIndex(): GuideSummary[] {
  const entries = fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".html"))
    .sort();

  if (entries.length === 0) {
    return [];
  }

  if (shouldUseCache(entries)) {
    const cached = readCache();
    if (cached) {
      return cached;
    }
  }

  const guides = entries.map((file) => parseGuideFile(path.join(GUIDES_DIR, file)));
  guides.sort((a, b) => a.title.localeCompare(b.title));

  writeCache(guides);

  return GuidesIndexSchema.parse(guides);
}

