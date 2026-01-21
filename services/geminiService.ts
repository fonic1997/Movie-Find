
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, MovieAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are an AI-powered Movie Review and Recommendation Assistant.
Role: Analyze movies using patterns from IMDb, Rotten Tomatoes, and Metacritic.
Rules:
1. Aggregate and normalize ratings internally.
2. Weight consistent opinions and repeated themes higher.
3. Reduce extreme review bias.
4. Detect sentiment accurately.
5. Strict output format as JSON.
6. Be neutral and unbiased. Use approximate ranges for data.
7. CRITICAL: Check movie availability specifically for the user's selected location and streaming platforms.
8. If data is limited, say "Based on available signals".`;

export const analyzeMovie = async (query: string, prefs: UserPreferences): Promise<string> => {
  const model = 'gemini-3-pro-preview';
  const prompt = `
    User Query: "${query}"
    Context:
    - User Location: ${prefs.location} (Prioritize results available in this region)
    - Industry: ${prefs.industry}
    - Platform: ${prefs.platform}
    - Preferred Genre: ${prefs.genre}
    - Preferred Mood: ${prefs.mood}
    - Time Available: ${prefs.time}

    Instructions:
    - Provide a detailed overview.
    - If the query is about availability, ensure the "availableOn" field reflects the "${prefs.location}" market.
    - If recommending, include 3-5 suggestions matching the region and industry.
    Always provide the analysis in a structured JSON format.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
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

  return response.text;
};
