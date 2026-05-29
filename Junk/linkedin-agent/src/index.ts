import { generateLinkedInPost, summarizePostAngle } from "./gemini";
import { loginToLinkedIn, postToLinkedIn } from "./linkedin";
import { scourTopic } from "./research";
import fs from "fs";
import path from "path";

const DRAFTS_DIR = path.join(__dirname, "../drafts");
const HISTORY_PATH = path.join(__dirname, "../history.json");

interface HistoryEntry {
    topic: string;
    summary: string;
    date: string;
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!fs.existsSync(DRAFTS_DIR)) {
        fs.mkdirSync(DRAFTS_DIR);
    }

    if (!command) {
        console.log("Usage:");
        console.log("  npm run post scour-all       - Read topics.json, scour the web and draft all posts");
        console.log("  npm run post scour \"Topic\"  - Scour the web and draft a post");
        console.log("  npm run post login           - Open LinkedIn to log in and save session");
        console.log('  npm run post post "Topic"    - (Manual/Auto) Generate and post immediately');
        return;
    }

    try {
        if (command === "login") {
            await loginToLinkedIn();
        } else if (command === "scour-all") {
            const configPath = path.join(__dirname, "../topics.json");
            if (!fs.existsSync(configPath)) {
                console.error(`topics.json not found at ${configPath}. Please create it first.`);
                return;
            }

            const topics: string[] = JSON.parse(fs.readFileSync(configPath, "utf-8"));
            console.log(`Starting research for ${topics.length} topics...`);

            // Load history
            let history: HistoryEntry[] = [];
            if (fs.existsSync(HISTORY_PATH)) {
                try {
                    history = JSON.parse(fs.readFileSync(HISTORY_PATH, "utf-8"));
                } catch (e) {
                    console.warn("Could not parse history.json, starting fresh.");
                }
            }

            let combinedMarkdown = `# Weekly LinkedIn Drafts - Generated on ${new Date().toLocaleDateString()}\n\n`;

            for (const topic of topics) {
                console.log(`\n--- Processing Topic: ${topic} ---`);
                const research = await scourTopic(topic);
                
                // Get history specific to this topic (up to last 5 entries to keep prompt focused)
                const topicHistory = history
                    .filter(h => h.topic === topic)
                    .slice(-5)
                    .map(h => h.summary);

                const postContent = await generateLinkedInPost(topic, research.summary, topicHistory);

                // Summarize the new post's angle for future history
                console.log("Summarizing post angle for history memory...");
                const angleSummary = await summarizePostAngle(postContent);
                history.push({
                    topic,
                    summary: angleSummary,
                    date: new Date().toISOString()
                });

                combinedMarkdown += `## Topic: ${topic}\n\n`;
                combinedMarkdown += `${postContent}\n\n`;
                combinedMarkdown += `### Sources:\n`;
                if (research.sources.length > 0) {
                    research.sources.forEach(src => {
                        combinedMarkdown += `- [${src}](${src})\n`;
                    });
                } else {
                    combinedMarkdown += `_No online sources used._\n`;
                }
                combinedMarkdown += `\n---\n\n`;
            }

            // Prune history to keep only the last 50 entries overall
            if (history.length > 50) {
                history = history.slice(-50);
            }

            // Save history
            fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
            console.log(`History memory updated at: ${HISTORY_PATH}`);

            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const combinedPath = path.join(DRAFTS_DIR, `combined-drafts-${timestamp}.md`);
            const latestPath = path.join(DRAFTS_DIR, `latest-drafts.md`);

            fs.writeFileSync(combinedPath, combinedMarkdown);
            fs.writeFileSync(latestPath, combinedMarkdown); // Overwrite latest for easy references in GH actions

            console.log(`\n✅ Completed all topics.`);
            console.log(`Combined report saved to: ${combinedPath}`);
            console.log(`Latest report reference: ${latestPath}`);


        } else if (command === "scour" || command === "post") {
            const topic = args[1];
            if (!topic) {
                console.error(`Please provide a topic. Example: npm run post ${command} 'Artificial Intelligence'`);
                return;
            }

            let researchSummary = "";
            let sources: string[] = [];

            if (command === "scour") {
                const research = await scourTopic(topic);
                researchSummary = research.summary;
                sources = research.sources;
            }

            console.log(`Generating post for topic: "${topic}"...`);
            const postContent = await generateLinkedInPost(topic, researchSummary);
            
            if (command === "scour") {
                const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                const filename = `draft-${topic.replace(/\s+/g, "-").toLowerCase()}-${timestamp}.md`;
                const filePath = path.join(DRAFTS_DIR, filename);

                const draftContent = `# Draft Post: ${topic}\n\n${postContent}\n\n---\n### Sources:\n${sources.join("\n")}`;
                fs.writeFileSync(filePath, draftContent);

                console.log("-----------------------------------");
                console.log(postContent);
                console.log("-----------------------------------");
                console.log(`\n✅ Draft saved to: ${filePath}`);
                console.log("You can now review this draft and manually post it to LinkedIn.");
            } else {
                // Immediate post flow
                console.log("-----------------------------------");
                console.log(postContent);
                console.log("-----------------------------------");
                await postToLinkedIn(postContent);
            }
        } else {
            console.error(`Unknown command: ${command}`);
        }
    } catch (error) {
        console.error("Agent failed:", error);
        process.exit(1);
    }
}

main();
