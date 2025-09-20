import { z } from "zod";

export const ToolLinkSchema = z.object({
  label: z.string(),
  url: z.string().url()
});

export const ToolSchema = z.object({
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  description: z.string(),
  type: z.string(),
  platform: z.string(),
  urls: z.array(ToolLinkSchema).min(1)
});

export const ToolsDocumentSchema = z.object({
  tools: z.array(ToolSchema)
});

export type ToolLink = z.infer<typeof ToolLinkSchema>;
export type Tool = z.infer<typeof ToolSchema>;
export type ToolsDocument = z.infer<typeof ToolsDocumentSchema>;
