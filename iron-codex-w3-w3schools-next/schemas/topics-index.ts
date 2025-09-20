import { z } from "zod";

export const TopicIndexEntrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  controls: z.number().int().nonnegative(),
  level: z.string(),
  category: z.string(),
  summary: z.string().optional()
});

export const TopicsIndexSchema = z.array(TopicIndexEntrySchema);

export type TopicIndexEntry = z.infer<typeof TopicIndexEntrySchema>;
export type TopicsIndex = z.infer<typeof TopicsIndexSchema>;
