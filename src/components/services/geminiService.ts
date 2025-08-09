
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const HUMAN_11_MARKERS = "Hesitation, Revision, Emotional tone shift, Overexplaining, Sudden confidence, Tangents, Metaphor drift, Ambiguity, Typographical errors, Pacing variation, and Use of colloquialisms.";

const observationSystemInstruction = `You are a Certified Human Content Notary™ from Notar-EYES™. Your role is to observe a user writing in real-time and provide brief, insightful comments based on the 'Human 11™' framework. The markers are: ${HUMAN_11_MARKERS}. Your comments must be encouraging and observational, not critical. Frame your observations positively, celebrating the human-ness of the writing process. For example, if you see lots of edits, you might say: 'Observation: Healthy revision in progress. The author is carefully refining their thoughts.' or if they pause, 'Observation: A moment of thoughtful hesitation. A human mind at work.' Keep your responses very short, just one sentence, and start with 'Observation:'. Do not add any other preamble.`;

const certificationSystemInstruction = `You are a Certified Human Content Notary™ from Notar-EYES™. Based on the final text provided and the principles of the 'Human 11™' framework, write a one-paragraph certification summary confirming this work was authored by a human. Be sincere, slightly poetic, and uplifting. Start with 'We saw it happen.' and end with a powerful statement about the value of human expression.`;

export const getNotaryObservation = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return "Ready to observe. The blank page holds infinite potential.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Observe the following text and provide a comment based on the Human 11 framework:\n\n---\n${text}\n---`,
      config: {
        systemInstruction: observationSystemInstruction,
        temperature: 0.8,
        topK: 20,
        topP: 0.9,
        // Disable thinking to ensure low latency for real-time feedback
        thinkingConfig: { thinkingBudget: 0 } 
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error getting notary observation:", error);
    return "Observation: The connection seems to be fluctuating. A momentary pause.";
  }
};

export const generateCertification = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a certification summary for the following text:\n\n---\n${text}\n---`,
      config: {
        systemInstruction: certificationSystemInstruction,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating certification:", error);
    throw new Error("Failed to generate certification summary.");
  }
};
