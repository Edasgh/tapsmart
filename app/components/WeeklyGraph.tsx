"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProgress } from "@/lib/progress";

type Activity = {
  date: string;
  xp: number;
  skills?: number;
};

export default function WeeklyGraph() {
  const [dailyActivity, setDailyActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const saved = getProgress();
    setDailyActivity(saved.dailyActivity || []);
    setLoading(false);
  }, []);

  // 🔥 STREAK CALCULATION
  const calculateStreak = () => {
    if (!dailyActivity.length) return 0;

    const sorted = [...dailyActivity].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < sorted.length; i++) {
      const d = sorted[i];
      const expectedDate = currentDate.toISOString().split("T")[0];

      if (d.date === expectedDate && d.xp > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border space-y-3">
      {/* 🔥 Streak */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Weekly Progress</p>

        <div className="text-sm font-semibold text-orange-500">
          🔥 {streak} day streak
        </div>
      </div>

      <motion.div layout>
        {loading ? (
          // 🔄 LOADER
          <div className="flex items-end gap-2 h-24 animate-pulse">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 flex items-end">
                <div className="w-full bg-gray-200 rounded-full h-[30%]" />
              </div>
            ))}
          </div>
        ) : dailyActivity.length === 0 ? (
          // 💤 EMPTY
          <div className="h-24 flex items-center justify-center text-sm text-gray-400">
            No activity yet
          </div>
        ) : (
          (() => {
            const last7Days = [...Array(7)].map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              const key = date.toISOString().split("T")[0];

              return (
                dailyActivity.find((d) => d.date === key) || {
                  date: key,
                  xp: 0,
                  skills: 0,
                }
              );
            });

            const maxXP = Math.max(...last7Days.map((d) => d.xp), 10);
            const today = new Date().toISOString().split("T")[0];

            return (
              <div className="flex items-end gap-3 h-28 relative">
                {last7Days.map((d, i) => {
                  const isActive = d.xp > 0;
                  const isToday = d.date === today;

                  const height = isActive
                    ? Math.max((d.xp / maxXP) * 100, 10)
                    : 4;

                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center relative"
                    >
                      {/* 🎯 BAR */}
                      <motion.div
                        onClick={() => setSelected(i)}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${height}%`, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.08,
                          type: "spring",
                        }}
                        className={`w-full rounded-full bg-gray-100 relative overflow-hidden cursor-pointer
                          ${
                            isActive
                              ? "bg-linear-to-t from-green-500 to-emerald-300 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                              : "bg-gray-200"
                          }
                          ${isToday ? "ring-2 ring-green-400" : ""}
                        `}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-white/20 blur-sm animate-pulse" />
                        )}
                      </motion.div>

                      {/* 📅 DAY */}
                      <span className="text-[10px] text-gray-400 mt-2">
                        {new Date(d.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </span>

                      {/* 💬 TOOLTIP */}
                      <AnimatePresence>
                        {selected === i && isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: -10, scale: 1 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full mb-2 px-3 py-1.5 text-xs bg-black text-white rounded-lg shadow-md whitespace-nowrap"
                          >
                            {d.xp} XP • {d.skills || 0} steps
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            );
          })()
        )}
      </motion.div>
    </div>
  );
}
