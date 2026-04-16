"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, ArrowLeft, Sparkles } from "lucide-react";
import { data } from "@/lib/data";

export default function AIClient() {
  const router = useRouter();
  const params = useSearchParams();
  const questId = params.get("id");
  const topic = data[Number(questId??0)].title;

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (text: string) => {
    setLoading(true);

    // add user msg
    setMessages((prev) => [...prev, { role: "user", text }]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          message: text,
          topic,
        }),
      });

      const aiData = await res.json();

      // simulate typing effect
      let reply = "";
      const full = aiData.reply;

      for (let i = 0; i < full.length; i++) {
        reply += full[i];

        await new Promise((r) => setTimeout(r, 8));

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "ai") {
            return [...prev.slice(0, -1), { role: "ai", text: reply }];
          }
          return [...prev, { role: "ai", text: reply }];
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong 😢" },
      ]);
    }

    setLoading(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    askAI(input);
    setInput("");
  };

  const suggestions = [
    `Explain ${topic} simply`,
    `Give real-life example`,
    `Why is this important?`,
    `Common mistakes`,
  ];

  return (
    <div className="min-h-screen flex justify-center px-4 py-4 relative bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* ✨ Glow BG */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-300/20 blur-3xl rounded-full -top-20 -left-20 animate-float" />
        <div className="absolute w-80 h-80 bg-purple-300/20 blur-3xl rounded-full bottom-0 right-0 animate-float delay-2000" />
      </div>

      <div className="w-full max-w-md flex flex-col h-screen relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-white shadow active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-sm text-gray-500">AI Assistant</p>
            <p className="font-semibold text-gray-800">{topic}</p>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto space-y-3 pb-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 text-sm mt-10">
              Ask anything about <b>{topic}</b>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                msg.role === "user"
                  ? "bg-black text-white ml-auto"
                  : "bg-white shadow"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}

          {loading && (
            <div className="text-sm text-gray-400 animate-pulse">
              AI is thinking...
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => askAI(s)}
              className="text-xs px-3 py-2 bg-white border rounded-full whitespace-nowrap hover:bg-gray-50"
            >
              <Sparkles size={12} className="inline mr-1" />
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${topic}...`}
            className="flex-1 px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200"
          />

          <button
            onClick={handleSend}
            className="bg-black text-white p-3 rounded-xl active:scale-95"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}