import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { message, topic } = await req.json();

    if (!message) {
      return NextResponse.json(
        { reply: "Please ask something first 🙂" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    // ✅ Better structured prompt
    const prompt = `
    You are a friendly AI tutor helping beginners learn step-by-step.

    Guidelines:
    - Use VERY simple language
    - Keep answers short (max 5 lines)
    - Use 1 real-life example if possible
    - Be encouraging and clear
    - Avoid long paragraphs

    Topic: ${topic || "General"}

    User Question:
    ${message}

    Answer:
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    });

    const response = result.response;

    // Use the built-in .text() method for cleaner code
    // It still needs a fallback in case the model blocked the response
    const reply =
      response.text() || "Hmm, I couldn’t answer that. Try again 🙂";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err);

   return NextResponse.json(
     { reply: "I'm having trouble connecting to my brain right now." },
     { status: 500 },
   );
  }
}
