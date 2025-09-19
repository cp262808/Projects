import fs from "fs";
import path from "path";
import { TopicSchema, type TopicData } from "@/schemas/topic";
export function loadTopic(topic: string): TopicData {
  const file = path.join(process.cwd(), "data", `${topic}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  return TopicSchema.parse(JSON.parse(raw));
}
