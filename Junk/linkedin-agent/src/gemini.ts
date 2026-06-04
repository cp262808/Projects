import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || "";
const VIEWPOINT_PATH = process.env.VIEWPOINT_PATH || path.join(__dirname, "../viewpoint.json");

interface ViewpointConfig {
    perspective: string;
    backgroundThemes: string[];
    values: string[];
    writingStyle: string[];
    avoid: string[];
}

const DEFAULT_VIEWPOINT: ViewpointConfig = {
    perspective: "A security practitioner who cares about pragmatic, privacy-conscious, business-aware security work.",
    backgroundThemes: [
        "product security for complex employee-facing and enterprise platforms",
        "third-party risk, application security reviews, and threat modeling",
        "responsible use of AI to improve security workflows",
        "balancing useful automation with human judgment and privacy"
    ],
    values: [
        "be practical instead of performative",
        "protect people and organizations without oversharing sensitive context",
        "prefer clear tradeoffs over generic best practices",
        "write with humility, curiosity, and peer-level credibility"
    ],
    writingStyle: [
        "professional but conversational",
        "specific about security concepts without naming private systems, employers, clients, or coworkers",
        "grounded in a viewpoint shaped by experience, not in personal anecdotes that reveal identifying details"
    ],
    avoid: [
        "employer names, client names, vendor account details, internal system names, team names, locations, dates, or career history",
        "claims that imply direct involvement in a specific incident unless the user supplies that text in the topic",
        "first-person statements that disclose personal information or private workplace details",
        "invented credentials, job titles, employers, or autobiographical facts"
    ]
};

function loadViewpoint(): ViewpointConfig {
    if (!fs.existsSync(VIEWPOINT_PATH)) {
        return DEFAULT_VIEWPOINT;
    }

    try {
        const parsed = JSON.parse(fs.readFileSync(VIEWPOINT_PATH, "utf-8"));
        return {
            perspective: parsed.perspective || DEFAULT_VIEWPOINT.perspective,
            backgroundThemes: parsed.backgroundThemes || DEFAULT_VIEWPOINT.backgroundThemes,
            values: parsed.values || DEFAULT_VIEWPOINT.values,
            writingStyle: parsed.writingStyle || DEFAULT_VIEWPOINT.writingStyle,
            avoid: parsed.avoid || DEFAULT_VIEWPOINT.avoid
        };
    } catch (error) {
        console.warn(`Could not parse viewpoint config at ${VIEWPOINT_PATH}. Using privacy-safe defaults.`);
        return DEFAULT_VIEWPOINT;
    }
}

function formatList(items: string[]): string {
    return items.map(item => `- ${item}`).join("\n");
}

export async function generateLinkedInPost(
    topic: string,
    researchData?: string,
    recentHistory?: string[]
): Promise<string> {
    if (!API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in .env file");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const viewpoint = loadViewpoint();

    const prompt = `
        You are drafting a LinkedIn post from a privacy-safe viewpoint brief.

        Viewpoint brief:
        ${viewpoint.perspective}

        Background themes to use as abstract context, not as personal facts:
        ${formatList(viewpoint.backgroundThemes)}

        Values and judgment style:
        ${formatList(viewpoint.values)}

        Writing style:
        ${formatList(viewpoint.writingStyle)}

        Privacy boundaries. Do NOT include or invent any of the following:
        ${formatList(viewpoint.avoid)}

        Write a high-quality, engaging LinkedIn post about the following topic: "${topic}".

        ${researchData ? `Here is some fresh research and news for context:\n${researchData}\n` : ""}

        ${recentHistory && recentHistory.length > 0 ? `
        IMPORTANT: Here are the angles, points, or sub-topics covered in recent posts on this subject.
        To avoid duplication, write about a DIFFERENT angle, sub-topic, or recent development.

        Recent post history:
        ${recentHistory.map(h => `- ${h}`).join("\n")}
        ` : ""}

        Guidelines:
        - Start with an attention-grabbing hook grounded in practical security work.
        - Reflect the viewpoint brief through priorities, tradeoffs, and framing, not through private autobiographical details.
        - Share a specific insight, lesson learned, or practical takeaway, not generic advice.
        - Use first person only for broad professional perspective, such as "I think" or "I look for"; do not claim private experiences.
        - Use line breaks for readability.
        - Use 2-3 relevant hashtags.
        - Encourage engagement with a question practitioners would want to answer.
        - Keep it professional yet conversational, like talking to a peer at a security conference.

        Output ONLY the post text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

export async function summarizePostAngle(post: string): Promise<string> {
    if (!API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in .env file");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
        Read the following LinkedIn post and summarize the core angle, concept, or news event covered in exactly one sentence.
        Focus on the specific technical details or examples discussed rather than the broad topic.

        Post:
        """
        ${post}
        """

        Output ONLY the single sentence summary.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
}
