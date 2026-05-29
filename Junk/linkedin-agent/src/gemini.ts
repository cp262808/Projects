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
        You are a professional LinkedIn content creator. 
        Write a high-quality, engaging LinkedIn post about the following topic: "${topic}".
        
        ${researchData ? `Here is some fresh research and news for context:\n${researchData}\n` : ""}
        
        ${recentHistory && recentHistory.length > 0 ? `
        IMPORTANT: Here are the angles, points, or sub-topics covered in our recent posts on this subject. 
        To avoid duplication, write about a DIFFERENT angle, sub-topic, or recent development.
        
        Recent post history:
        ${recentHistory.map(h => `- ${h}`).join("\n")}
        ` : ""}
        
        Guidelines:
        - Start with an attention-grabbing hook.
        - Use local/current context if available in the research.
        - Use line breaks for readability.
        - Use 2-3 relevant hashtags.
        - Encourage engagement (ask a question).
        - Keep it professional yet conversational.
        
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

