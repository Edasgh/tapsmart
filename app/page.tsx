"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { data } from "@/lib/data";
import { getProgress } from "@/lib/progress";
import WeeklyGraph from "./components/WeeklyGraph";

export default function HomeScreen() {
  const router = useRouter();

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [dailyActivity, setDailyActivity] = useState<
    { date: string; xp: number; skills?: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const [stepTimes, setStepTimes] = useState<number[]>([]);
  const [showLockMsg, setShowLockMsg] = useState<number | null>(null);

  // 🧠 Insights
  const [todaySkills, setTodaySkills] = useState(0);
  const [speedPercent, setSpeedPercent] = useState(0);

  // 🏅 Achievements
  const achievements = [
    { id: 1, title: "First Step 🎯", condition: xp >= 10 },
    { id: 2, title: "Getting Started 🚀", condition: xp >= 50 },
    { id: 3, title: "Tech Explorer 🌐", condition: xp >= 150 },
  ];

  useEffect(() => {
    setTimeout(() => {
      const saved = getProgress();

      setXp(saved.xp);
      setLevel(saved.level);
      setCompletedQuests(saved.completedQuests);
      setDailyActivity(saved.dailyActivity || []);
      setStepTimes(saved.stepTimes || []);

      // 📅 Today skills
      const today = new Date().toISOString().split("T")[0];
      const todayData = saved.dailyActivity?.find((d) => d.date === today);
      setTodaySkills(todayData?.skills || 0);

      // ⚡ Speed (lower time = better)
      if (saved.stepTimes?.length) {
        const avg =
          saved.stepTimes.reduce((a, b) => a + b, 0) / saved.stepTimes.length;

        // normalize (faster = higher %)
        const score = Math.max(10, Math.min(100, 100 - avg / 50));
        setSpeedPercent(Math.floor(score));
      }
      setLoading(false);
    }, 0);
  }, []);

  // 🚀 Smart Start
  const handleStart = () => {
    const nextIndex = data.findIndex((q) => !completedQuests.includes(q.title));
    const target = nextIndex === -1 ? data.length - 1 : nextIndex;

    router.push(`/quest/${target}`);
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-6 relative bg-linear-to-br from-yellow-50 via-white to-yellow-100">
      {/* ✨ Animated Warm Glow Layer (Yellow Theme) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft Sun Glow */}
        <div className="absolute w-105 h-105 bg-yellow-300/30 rounded-full blur-3xl animate-float -top-32 -left-24" />

        {/* Warm Orange Glow */}
        <div className="absolute w-90 h-90 bg-amber-300/30 rounded-full blur-3xl animate-float delay-2000 -bottom-32 -right-16" />

        {/* Light Gold Accent */}
        <div className="absolute w-75 h-75 bg-yellow-200/20 rounded-full blur-3xl animate-float delay-4000 top-[40%] left-[30%]" />
      </div>
      <div className="w-full max-w-md space-y-5 relative">
        {/* 👋 SIMPLE GREETING */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Hello 👋</h1>
          <p className="text-gray-500 text-base">
            Let’s learn something new today
          </p>
        </div>

        {/* 🧠 USER PROGRESS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-5 border"
        >
          {/* XP + Level */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">Level {level}</p>
              <p className="text-xl font-semibold text-gray-800">{xp} XP</p>
            </div>

            {/* Progress Bar */}
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${xp % 100}%` }}
              />
            </div>
          </div>

          {/* 🏅 Achievements */}
          <div className="flex flex-wrap gap-2 mt-2">
            {achievements.map(
              (a) =>
                a.condition && (
                  <span
                    key={a.id}
                    className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg"
                  >
                    {a.title}
                  </span>
                ),
            )}
          </div>
        </motion.div>

        {/* 📊 INSIGHTS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <p className="text-xs text-gray-500">Today</p>
            <p className="text-lg font-semibold">
              {todaySkills} steps completed
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <p className="text-xs text-gray-500">Speed</p>
            {speedPercent > 0 ? (
              <p className="text-lg font-semibold">
                Faster than {speedPercent}%
              </p>
            ) : (
              <p className="text-base text-gray-500 italic font-semibold">
                No data
              </p>
            )}
          </div>
        </div>

        {/* 📈 WEEKLY GRAPH */}
        <WeeklyGraph/>

        {/* 📚 ALL QUESTS */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            All Lessons
          </h3>

          <div className="space-y-3">
            {data.map((quest, index) => {
              const isCompleted = completedQuests.includes(quest.title); // track this
              const isLocked = index > level + 1; // optional lock logic

              return (
                <motion.div
                  key={index}
                  whileTap={{ scale: isLocked ? 1 : 0.97 }}
                  onClick={() => {
                    if (isLocked) {
                      setShowLockMsg(index);
                      setTimeout(() => setShowLockMsg(null), 1500);
                    } else {
                      router.push(`/quest/${index}`);
                    }
                  }}
                  onMouseEnter={() => isLocked && setShowLockMsg(index)}
                  onMouseLeave={() => setShowLockMsg(null)}
                  className={`relative rounded-2xl p-4 flex items-center justify-between transition-all
    ${
      isLocked
        ? "bg-gray-100 text-gray-400"
        : "bg-white shadow-sm hover:shadow-md cursor-pointer"
    }`}
                >
                  {/* LEFT */}
                  <div>
                    <p className="text-base font-medium text-gray-800">
                      {quest.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-0.5">
                      {quest.steps.length} steps
                    </p>
                  </div>

                  {/* RIGHT STATUS */}
                  <div className="flex items-center gap-2">
                    {isCompleted && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        ✓ Done
                      </span>
                    )}

                    {/* 🤖 Ask AI */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/ai?id=${index}`);
                      }}
                      className="text-xs bg-blue-100 px-2 py-1 rounded-full"
                    >
                      Ask AI
                    </button>

                    {isLocked && (
                      <span className="text-gray-400 text-lg">🔒</span>
                    )}

                    {!isCompleted && !isLocked && (
                      <span className="text-gray-400 text-lg">›</span>
                    )}
                  </div>

                  {/* 💬 TOOLTIP */}
                  {isLocked && showLockMsg === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap"
                    >
                      Complete previous steps first
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/*  START BUTTON */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => handleStart()}
          className="w-full bg-black text-white py-4 rounded-xl text-lg font-medium"
        >
          Start Learning
        </motion.button>
      </div>
    </div>
  );
}
