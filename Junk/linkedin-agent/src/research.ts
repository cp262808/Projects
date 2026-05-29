import { tavily } from "@tavily/core";
import dotenv from "dotenv";

dotenv.config();

const TAVILY_API_KEY = process.env.TAVILY_API_KEY || "";

export interface ResearchResult {
    topic: string;
    summary: string;
    sources: string[];
}

export async function scourTopic(topic: string): Promise<ResearchResult> {
    if (!TAVILY_API_KEY) {
        console.warn("TAVILY_API_KEY is not set. Research will be limited to Gemini's internal knowledge.");
        return {
            topic,
            summary: "No real-time research performed (missing API key).",
            sources: []
        };
    }

    const tvly = tavily({ apiKey: TAVILY_API_KEY });
    
    console.log(`Searching the universe for: ${topic}...`);
    
    // Search for the latest trends and news
    const searchResponse = await tvly.search(`latest trends and news in ${topic}`, {
        searchDepth: "advanced",
        maxResults: 5
    });

    const summary = searchResponse.results.map(r => `- ${r.title}: ${r.content}`).join("\n");
    const sources = searchResponse.results.map(r => r.url);

    return {
        topic,
        summary,
        sources
    };
}
