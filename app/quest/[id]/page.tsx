"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useParams, useRouter } from "next/navigation";
import { data } from "@/lib/data";
import { getProgress, saveProgress } from "@/lib/progress";

export default function QuestScreen() {
  type UserProgress = {
    xp: number;
    level: number;
    completedQuests: string[];
  };

  const [xp, setXp] = useState(0);
  const [prevXp, setPrevXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [prevLevel, setPrevLevel] = useState(1);
  const [xpPopups, setXpPopups] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const gainXP = (amount: number) => {
    setXp((prev) => {
      const newXP = prev + amount;

      setLevel((l) => {
        const newLevel = newXP >= l * 100 ? l + 1 : l;

        saveProgress({
          xp: newXP,
          level: newLevel,
          completedQuests,
        });

        return newLevel;
      });

      return newXP;
    });
  };

  const levels = [
    "Beginner 👶",
    "Learner 📘",
    "Explorer 🌍",
    "Pro User 💡",
    "Tech Hero 🦸",
  ];

  // 🏅 Achievements
  const achievements = [
    { id: 1, title: "First Step 🎯", condition: xp >= 10 },
    { id: 2, title: "Getting Started 🚀", condition: xp >= 50 },
    { id: 3, title: "Tech Explorer 🌐", condition: xp >= 150 },
  ];

  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuest, setCurrentQuest] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  // 🎉 Confetti
  const launchConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  };

  // 🔊 Voice
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;

    speechSynthesis.cancel(); // stop previous voice

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const saved = getProgress();
    setXp(saved.xp);
    setPrevXp(saved.xp);
    setLevel(saved.level);
    setPrevLevel(saved.level);
    setCompletedQuests(saved.completedQuests);
  }, []);

  useEffect(() => {
    if (params) {
      setCurrentQuest(parseInt(params.id));
    } else {
      router.push("/");
    }
  }, [params]);

  useEffect(() => {
    if (data[currentQuest]) {
      speak(data[currentQuest].steps[0]);
    }
  }, [currentQuest]);

  useEffect(() => {
    if (!data[currentQuest]) return;

    // Only speak if step is valid
    if (currentStep < data[currentQuest].steps.length) {
      speak(data[currentQuest].steps[currentStep]);
    }
  }, [currentStep, currentQuest]);

  useEffect(() => {
    if (currentStep === data[currentQuest].steps.length) {
      const title = data[currentQuest].title;

      if (!completedQuests.includes(title)) {
        const updated = [...completedQuests, title];

        setCompletedQuests(updated);

        saveProgress({
          xp,
          level,
          completedQuests: updated,
        });
        launchConfetti(); // 🎉
        speak("Lesson Completed!");
      }
    }
  }, [currentStep]);

  const completeStep = (index: number, e?: React.MouseEvent) => {
    if (index === currentStep) {
      gainXP(10);

      // 🎯 Get click position
      const rect = (e?.currentTarget as HTMLElement)?.getBoundingClientRect();

      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top : window.innerHeight / 2;

      const id = Date.now();

      // Add popup
      setXpPopups((prev) => [...prev, { id, x, y }]);

      // Remove after animation
      setTimeout(() => {
        setXpPopups((prev) => prev.filter((p) => p.id !== id));
      }, 800);

      setCompleted((prev) => (prev.includes(index) ? prev : [...prev, index]));
      setCurrentStep(index + 1);
    }
  };

  const hasNextQuest = currentQuest < data.length - 1;

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex justify-center px-2 sm:px-4">
      <div className="w-full max-w-md bg-white min-h-screen px-4 py-5">
        <div className="fixed inset-0 pointer-events-none z-50">
          {xpPopups.map((popup) => (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: "absolute",
                left: popup.x,
                top: popup.y,
                transform: "translate(-50%, -50%)",
              }}
              className="text-green-600 font-semibold text-lg"
            >
              +10 XP
            </motion.div>
          ))}
        </div>
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm px-3 py-1.5 rounded-full bg-gray-100 active:scale-95 transition"
          >
            ← Home
          </button>

          <p className="text-sm font-medium text-gray-600">Level {level}</p>
        </div>
        {/* XP HEADER */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">
              {levels[level - 1] || "Legend 🔥"}
            </p>

            <p className="text-sm font-semibold text-gray-800">{xp} XP</p>
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${xp % 100}%` }}
            />
          </div>
        </div>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-lg font-semibold text-gray-700">Today’s Quest</h1>

          <h2 className="text-xl font-bold text-gray-900 mt-1">
            {data[currentQuest].title}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {currentStep !== data[currentQuest].steps.length
              ? "Tap the glowing area to continue"
              : "Quest Completed!"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            animate={{
              width: `${(currentStep / data[currentQuest].steps.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Steps */}
        {currentStep !== data[currentQuest].steps.length && (
          <div className="space-y-3">
            {data[currentQuest].steps.map((step, index) => {
              const isActive = index === currentStep;
              const isDone = completed.includes(index);

              return (
                <div
                  key={index}
                  className={`rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden transition ${
                    isActive ? "shadow-md border-blue-200" : ""
                  }`}
                >
                  {/* Step Header */}
                  <div
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center gap-3 p-3 cursor-pointer ${
                      isActive ? "bg-blue-50 shadow-md" : ""
                    }`}
                  >
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100">
                      {isDone ? (
                        <CheckCircle className="text-green-500" size={18} />
                      ) : (
                        <span className="text-sm font-medium text-gray-700">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <p className="flex-1 text-base text-gray-800">{step}</p>
                  </div>

                  {/* Active Content */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-2 sm:px-3 pb-3"
                    >
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={data[currentQuest].images[index]}
                          className="w-full sm:h-75 md:h-105 object-cover"
                        />

                        {/* Highlight stays SAME */}
                        <div
                          onClick={(e) => completeStep(index, e)}
                          className={`absolute flex items-center justify-center cursor-pointer  ${data[currentQuest].getClassName(index)}`}
                        >
                          <span className="w-10 h-10 md:w-20 md:h-20 border-4 border-red-500 rounded-full animate-ping" />
                        </div>

                        {/* Glass instruction bar */}
                        <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-md text-white text-xs p-3 flex justify-between items-center">
                          <span>{step}</span>

                          <button
                            onClick={() => speak(step)}
                            className="p-2 rounded-full bg-white/20 active:scale-95"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 🏅 Achievements */}
        {currentStep === data[currentQuest].steps.length && (
          <>
            <div className="flex gap-2 flex-wrap mt-4">
              {achievements.map(
                (a) =>
                  a.condition && (
                    <span
                      key={a.id}
                      className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                    >
                      {a.title}
                    </span>
                  ),
              )}
            </div>

            {/* Completion */}

            <div className="bg-white border rounded-2xl shadow-md p-6 text-center space-y-4 mt-10">
              <div className="bg-green-100 p-3 rounded-full inline-block">
                <CheckCircle className="text-green-600" size={26} />
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                Quest Completed!
              </h2>

              <p className="text-sm text-gray-500">Great job! 🎉</p>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 bg-gray-100 text-gray-800 py-2.5 rounded-xl text-sm"
                >
                  Home
                </button>

                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setCompleted([]);
                    setXp(prevXp);
                    setLevel(prevLevel);
                  }}
                  className="flex-1 border py-2.5 rounded-xl text-sm"
                >
                  Retry
                </button>

                {hasNextQuest && (
                  <button
                    onClick={() => router.push(`/quest/${currentQuest + 1}`)}
                    className="flex-1 bg-green-500 text-white py-2.5 rounded-xl text-sm cursor-pointer"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
