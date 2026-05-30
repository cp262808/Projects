import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || "";

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

    const prompt = `
        You are ghostwriting a LinkedIn post for a Product Security Architect at a major financial institution.
        
        Author context:
        - Works in product security for workforce experience applications (HR tech, employee-facing platforms).
        - The primary application in scope is Oracle HCM Cloud, with multiple integrations to other SaaS vendors and internal systems.
        - Day-to-day work includes 3rd-party security assessments, internal application security reviews, and deep threat modeling.
        - Actively uses AI/LLMs to enhance and accelerate threat modeling workflows.
        - Writes from first-person perspective ("I", "we", "my team") with real practitioner credibility.
        - Tone: authoritative but approachable, sharing hard-won lessons from the trenches, not academic theory.
        
        Write a high-quality, engaging LinkedIn post about the following topic: "${topic}".
        
        ${researchData ? `Here is some fresh research and news for context:\n${researchData}\n` : ""}
        
        ${recentHistory && recentHistory.length > 0 ? `
        IMPORTANT: Here are the angles, points, or sub-topics covered in our recent posts on this subject. 
        To avoid duplication, write about a DIFFERENT angle, sub-topic, or recent development.
        
        Recent post history:
        ${recentHistory.map(h => `- ${h}`).join("\n")}
        ` : ""}
        
        Guidelines:
        - Start with an attention-grabbing hook grounded in real-world security work.
        - Draw on the author's experience with Oracle HCM, SaaS integrations, 3rd-party risk, or AI-assisted threat modeling where relevant.
        - Share a specific insight, lesson learned, or practical takeaway — not generic advice.
        - Use line breaks for readability.
        - Use 2-3 relevant hashtags (e.g. #AppSec #ThreatModeling #ProductSecurity #AIinSecurity).
        - Encourage engagement (ask a question that fellow security practitioners would want to answer).
        - Keep it professional yet conversational — like talking to a peer at a security conference.
        - Do NOT mention the employer by name. Use phrases like "at a large financial institution" or "in financial services" if needed.
        
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

