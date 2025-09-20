import fs from "fs";
import path from "path";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";

import { loadGuidesIndex } from "@/lib/loadGuidesIndex";

function computeExpectedReadTime(slug: string): { minutes: number; label: string } {
  const filePath = path.join(process.cwd(), "content", "guides", `${slug}.html`);
  const html = fs.readFileSync(filePath, "utf-8");
  const $ = load(html);
  const text = $("main.guide-content").text();
  const words = text.trim().split(/\s+/).filter(Boolean);
  const minutes = Math.max(1, Math.round(words.length / 200));
  return { minutes, label: `${minutes} min read` };
}

describe("loadGuidesIndex", () => {
  it("parses guides metadata from the HTML exports", () => {
    const guides = loadGuidesIndex();
    expect(guides.length).toBeGreaterThan(0);

    const apiGuide = guides.find((guide) => guide.slug === "api-security");
    expect(apiGuide).toBeDefined();
    expect(apiGuide?.title).toContain("API Security");
    expect(apiGuide?.controlCount).toBeGreaterThan(50);
    expect(apiGuide?.difficulty).toBe("Expert");
    expect(apiGuide?.summary.length ?? 0).toBeGreaterThan(0);

    if (!apiGuide) {
      throw new Error("API Security guide should be present");
    }

    const expectedReadTime = computeExpectedReadTime(apiGuide.slug);
    expect(apiGuide.readTimeMinutes).toEqual(expectedReadTime.minutes);
    expect(apiGuide.readTime).toEqual(expectedReadTime.label);
  });
});
