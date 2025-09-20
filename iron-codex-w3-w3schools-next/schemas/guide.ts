import { z } from "zod";

export const GuideDifficultySchema = z.enum([
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert"
]);

export const GuideSummarySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  controlCount: z.number().int().nonnegative(),
  difficulty: GuideDifficultySchema,
  summary: z.string().min(1),
  readTimeMinutes: z.number().int().positive(),
  readTime: z.string().min(1),
  lastUpdated: z.string().min(1).optional()
});

export const GuidesIndexSchema = z.array(GuideSummarySchema);

export type GuideSummary = z.infer<typeof GuideSummarySchema>;
export type GuideDifficulty = z.infer<typeof GuideDifficultySchema>;
