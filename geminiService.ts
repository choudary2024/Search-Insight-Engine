
import { GoogleGenAI, Type } from "@google/genai";
import { BookSummary } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const summarySchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    authorAlias: { type: Type.STRING },
    executiveSummary: { type: Type.STRING },
    chapters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          keyPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["id", "title", "summary", "keyPoints"]
      }
    },
    conclusion: { type: Type.STRING }
  },
  required: ["title", "authorAlias", "executiveSummary", "chapters", "conclusion"]
};

export async function generateBookSummary(thesis: string): Promise<BookSummary> {
  const prompt = `Generate a comprehensive, academic-style bullet point summary of a conceptual book based on the following thesis: "${thesis}". 
  The summary should be structured as a seminal business and technology book with 6-8 chapters. 
  Each chapter must include a title, a high-level summary, and at least 5 deep-dive bullet points exploring specific implications for professional software (e.g., IDEs, CRM, Design tools, Medical software, etc.). 
  Focus on technical integration, user experience paradigms, and the shift from "Discovery" to "Actionable Intelligence".`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: summarySchema,
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Intelligence parsing failed.");
  }
}
