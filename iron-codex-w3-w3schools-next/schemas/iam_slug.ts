// Auto-generated slug schema for IAM section
import { z } from "zod";

export const IAMSlugSchema = z.enum(["intro", "auth-basics", "mfa", "adaptive", "sso", "federation", "oauth", "rbac", "abac", "least", "lifecycle", "pam", "monitoring", "quiz", "snippets"] as const);
export type IAMSlug = z.infer<typeof IAMSlugSchema>;
export const IAM_VALID_SLUGS: IAMSlug[] = IAMSlugSchema.options;
