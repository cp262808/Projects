import { z } from "zod";

export const heroStatKeys = [
  "topics_count",
  "controls_count",
  "guides_count",
  "examples_count",
  "resources_count"
] as const;

const HeroStatKeySchema = z.enum(heroStatKeys);

const HeroStatSchema = z.object({
  label: z.string(),
  key: HeroStatKeySchema,
  href: z.string().optional()
});

const QuickLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  key: z.string()
});

const TopicBucketSchema = z.object({
  title: z.string(),
  items: z.array(z.object({ label: z.string(), href: z.string() }))
});

const ToolSpotlightSchema = z.object({
  label: z.string(),
  href: z.string()
});

export const HomeSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    search: z.object({
      action: z.string(),
      placeholder: z.string(),
      buttonLabel: z.string()
    }),
    stats: z.array(HeroStatSchema)
  }),
  quickLinks: z.array(QuickLinkSchema),
  topicBuckets: z.array(TopicBucketSchema),
  toolSpotlight: z.array(ToolSpotlightSchema)
});

export type HomeFile = z.infer<typeof HomeSchema>;
export type HeroStatKey = z.infer<typeof HeroStatKeySchema>;
export type HeroStat = HomeFile["hero"]["stats"][number] & { value: number };
export type HomeContent = Omit<HomeFile, "hero"> & {
  hero: Omit<HomeFile["hero"], "stats"> & { stats: HeroStat[] };
};
