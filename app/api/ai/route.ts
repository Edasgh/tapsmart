import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { data } from "@/lib/data";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { message, topic, questId } = await req.json();

    if (!message) {
      return NextResponse.json(
        { reply: "Please ask something first 🙂" },
        { status: 400 },
      );
    }

    const systemPrompt = `
    You are a beginner-friendly AI tutor helping users follow step-by-step instructions.

    RULES:
    - You are given a list of steps
    - If the user refers to a specific step (by number or meaning), explain THAT step only
    - If unclear, assume they are asking about the current step
    - Do NOT explain all steps unless asked
    - Use very simple language (for senior citizens)
    - Keep answers short (3–5 lines)
    - Give 1 small real-life example if helpful

    STYLE:
    - Clear, friendly, and patient
    - Action-based (Tap, Click, Type, etc.)
    - No technical jargon
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: systemPrompt,
    });

    // ✅ Better structured prompt
    const inputPrompt = `
    Topic: ${topic}

    Steps:
    ${data[Number(questId)??0].steps.map((s: string, i: number) => `${i + 1}. ${s}`).join("\n")}


    User Question:
    ${message}

    Instruction:
    - If the user mentions a step number → explain that step
    - If the user describes an action → match it to the closest step and explain it
    - Keep it very simple and short

    Answer:
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: inputPrompt }] }],
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
