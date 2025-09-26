
import { GoogleGenAI, Type } from "@google/genai";
import type { Question } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    topic: {
      type: Type.STRING,
      description: "A creative and engaging title for the question based on the combined concepts."
    },
    questionText: {
      type: Type.STRING,
      description: "The full text of the physics problem, including all necessary values and diagrams described in text."
    },
    solution: {
      type: Type.STRING,
      description: "A detailed, step-by-step solution to the problem, explaining the application of each concept."
    },
    finalAnswer: {
      type: Type.STRING,
      description: "The final numerical or symbolic answer to the question, clearly stated."
    }
  },
  required: ['topic', 'questionText', 'solution', 'finalAnswer']
};


export const generateQuestion = async (concepts: string[]): Promise<Question> => {
  const prompt = `
    Generate a novel and challenging multi-concept physics problem suitable for the JEE Advanced exam.
    The problem must creatively and deeply integrate the following concepts: ${concepts.join(', ')}.
    Do not just create a problem with two separate parts; the concepts must be intertwined in a single scenario.
    The scenario should be interesting and unique.
    Provide a detailed, step-by-step solution that explains how the chosen concepts are used to arrive at the answer.
    Finally, provide a clear, concise final answer.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    // It's good practice to validate the parsed object, but for this app, we trust the schema
    const parsedQuestion = JSON.parse(jsonText) as Question;
    return parsedQuestion;

  } catch (error) {
    console.error("Error generating question from Gemini API:", error);
    throw new Error("Failed to generate question. Please try again later.");
  }
};
