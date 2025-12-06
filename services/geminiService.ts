import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are 'Greeny', an advanced AI Agricultural Assistant for Arasupandian Farm Service (AFS), located in Theni, Tamil Nadu.
Your goal is to assist farmers with crop guidance, fertilizer recommendations, pest identification, and general farming queries.

Key traits:
1.  **Bilingual**: You must support both Tamil and English smoothly. If the user asks in Tamil, reply in Tamil.
2.  **Expertise**: You know about Banana, Coconut, Cardamom, Grapes, and common Indian crops.
3.  **Tone**: Friendly, respectful, and professional (like a trusted field officer).
4.  **Context**: AFS sells fertilizers, organic products, and offers field visits. Recommend visiting the store for complex issues.
5.  **Image Analysis**: If an image is provided, analyze it for crop diseases, nutrient deficiencies, or pest attacks and suggest remedies.

If you don't know the answer, advise them to contact AFS support directly at +91 93637 34905.
`;

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[],
  imageBase64?: string
): Promise<string> => {
  try {
    if (!apiKey) {
      return "System Error: API Key is missing. Please contact support.";
    }

    // Prepare contents. We are not using chat history state in the model purely for simplicity here,
    // but constructing a single prompt with context or just sending the new message.
    // Ideally, for a chat, we use ai.chats.create, but for mixed modality (images) in history, 
    // it's often easier to just send the current context as a generated content request or manage history manually.
    // For this demo, we will perform a direct generateContent for the current turn to ensure image handling is robust.
    
    const parts: any[] = [];
    
    if (imageBase64) {
      // Remove data URL prefix if present
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg', // Assuming jpeg for simplicity, though could be png
          data: cleanBase64
        }
      });
    }

    parts.push({ text: message });

    // Use a lightweight model for quick responses, or Pro for complex reasoning.
    // Flash is great for this.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am having trouble connecting to the agricultural database right now. Please try again later.";
  }
};