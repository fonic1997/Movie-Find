
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences } from "../types";

export const analyzeMovie = async (query: string, prefs: UserPreferences): Promise<string> => {
  // Always initialize with the key from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `You are an AI-powered Movie Review and Recommendation Assistant.
Role: Analyze movies using patterns from IMDb, Rotten Tomatoes, and Metacritic.
Rules:
1. Aggregate and normalize ratings internally.
2. Weight consistent opinions and repeated themes higher.
3. Detect sentiment accurately.
4. Strict output format as JSON.
5. Check movie availability for the user's selected location: ${prefs.location}.`;

  const prompt = `Analyze the following movie or query: "${query}". 
User Preferences: Location=${prefs.location}, Industry=${prefs.industry}, Platform=${prefs.platform}, Mood=${prefs.mood}, Duration=${prefs.time}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                industry: { type: Type.STRING },
                genre: { type: Type.STRING },
                runtime: { type: Type.STRING },
                availableOn: { type: Type.STRING },
              },
              required: ["title", "industry", "genre", "runtime", "availableOn"]
            },
            ratings: {
              type: Type.OBJECT,
              properties: {
                overall: { type: Type.STRING },
                audience: { type: Type.STRING },
                critic: { type: Type.STRING },
              },
              required: ["overall", "audience", "critic"]
            },
            review: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                whoWatch: { type: Type.STRING },
                whoSkip: { type: Type.STRING },
              },
              required: ["summary", "strengths", "weaknesses", "whoWatch", "whoSkip"]
            },
            sentiment: {
              type: Type.OBJECT,
              properties: {
                positiveThemes: { type: Type.ARRAY, items: { type: Type.STRING } },
                complaints: { type: Type.ARRAY, items: { type: Type.STRING } },
                mood: { type: Type.STRING },
              },
              required: ["positiveThemes", "complaints", "mood"]
            },
            verdict: {
              type: Type.OBJECT,
              properties: {
                worth: { type: Type.STRING },
                bestFor: { type: Type.STRING },
              },
              required: ["worth", "bestFor"]
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              }
            }
          },
          required: ["overview", "ratings", "review", "sentiment", "verdict"]
        }
      }
    });

    // Directly access the .text property as per guidelines
    return response.text || "{}";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to connect to Gemini AI.");
  }
};
