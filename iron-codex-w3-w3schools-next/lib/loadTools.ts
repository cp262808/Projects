import fs from "fs";
import path from "path";

import { ToolsDocumentSchema, type ToolsDocument } from "@/schemas/tool";

export function loadTools(): ToolsDocument {
  const file = path.join(process.cwd(), "content", "tools.json");
  const raw = fs.readFileSync(file, "utf-8");
  const data = JSON.parse(raw);
  return ToolsDocumentSchema.parse(data);
}
