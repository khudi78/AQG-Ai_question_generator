import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use supported model names
const MODEL = "gemini-1.5-flash";

export async function generateQuestions(topic, difficulty) {
  try {
    console.log(`🧠 Generating questions on topic "${topic}" (${difficulty})...`);

    const model = genAI.getGenerativeModel({ model: MODEL });

    const prompt = `
      Generate 5 ${difficulty}-level multiple-choice questions on ${topic}.
      Each question should have 4 options and indicate the correct answer.
      Format it in JSON like this:
      [
        {"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"},
        ...
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    console.log("✅ AI Response:", response);
    return JSON.parse(response);
  } catch (error) {
    console.error("❌ Gemini AI Generation Error:", error);
    return { error: "Failed to generate questions" };
  }
}
