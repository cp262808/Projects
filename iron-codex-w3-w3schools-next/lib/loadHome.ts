import fs from "fs";
import path from "path";
import { z } from "zod";

import { HomeSchema, type HomeContent } from "@/schemas/home";

const IndexStatsSchema = z.object({
  topics_count: z.number(),
  controls_count: z.number(),
  guides_count: z.number(),
  examples_count: z.number(),
  resources_count: z.number()
});

export function loadHome(): HomeContent {
  const homePath = path.join(process.cwd(), "content", "home.json");
  const homeRaw = fs.readFileSync(homePath, "utf-8");
  const homeData = HomeSchema.parse(JSON.parse(homeRaw));

  const indexPath = path.join(process.cwd(), "content", "index.json");
  const indexRaw = fs.readFileSync(indexPath, "utf-8");
  const indexData = IndexStatsSchema.parse(JSON.parse(indexRaw));

  const stats = homeData.hero.stats.map((stat) => ({
    ...stat,
    value: indexData[stat.key]
  }));

  return {
    ...homeData,
    hero: {
      ...homeData.hero,
      stats
    }
  };
}
