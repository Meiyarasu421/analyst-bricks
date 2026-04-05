import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `You are "DataAnalyst AI", a specialized career coach and technical mentor for aspiring Data Analysts. 
Your goal is to help users:
1. Learn technical skills (SQL, Python, Excel, Statistics, Power BI/Tableau).
2. Build a strong data portfolio.
3. Find internships and jobs.
4. Prepare for interviews (technical and behavioral).
5. Personal Development: Help users improve soft skills like English fluent communication, presentation skills, and professional networking.

Guidelines:
- Be encouraging, professional, and data-driven.
- Provide code snippets in SQL or Python when relevant.
- Suggest specific projects or datasets (e.g., from Kaggle).
- Help with resume reviews and LinkedIn optimization.
- For English communication: Provide tips on business communication, common interview phrases, and how to explain technical concepts clearly to non-technical stakeholders.
- If asked about jobs, provide general advice on where to look and how to network.
- Keep responses concise but informative. Use Markdown for formatting.`;

export async function chatWithAI(messages: Message[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error. Please check your connection or try again later.";
  }
}
