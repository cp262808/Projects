import { z } from "zod";
export const TopicSchema = z.object({
  slugs: z.array(z.object({ id: z.string(), title: z.string(), keywords: z.string().optional() }))
});
export type TopicData = z.infer<typeof TopicSchema>;
