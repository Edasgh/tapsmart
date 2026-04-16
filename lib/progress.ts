import Cookies from "js-cookie";

const KEY = "genlink_progress";

export type UserProgress = {
  xp: number;
  level: number;
  completedQuests: string[];
  dailyActivity: { date: string; xp: number; skills: number }[];
  stepTimes: number[]; // ms
};

// 🧠 Default state
const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  completedQuests: [],
  dailyActivity: [],
  stepTimes: [],
};

// ✅ Get progress (safe)
export const getProgress = (): UserProgress => {
  try {
    const data = Cookies.get(KEY);

    if (!data) return defaultProgress;

    const parsed = JSON.parse(data);

    return {
      ...defaultProgress,
      ...parsed, // ensures missing fields don't break
    };
  } catch (err) {
    console.error("Progress parse error:", err);
    return defaultProgress;
  }
};

// ✅ Save progress
export const saveProgress = (progress: UserProgress) => {
  Cookies.set(KEY, JSON.stringify(progress), {
    expires: 180, // ~6 months
  });
};

export const updateDailyActivity = (xpGained: number) => {
  const progress = getProgress();

  const today = new Date().toISOString().split("T")[0];

  const existing = progress.dailyActivity.find((d) => d.date === today);

  if (existing) {
    existing.xp += xpGained;
    existing.skills += 1;
  } else {
    progress.dailyActivity.push({
      date: today,
      xp: xpGained,
      skills: 1,
    });
  }

  saveProgress(progress);
};

export const addStepTime = (time: number) => {
  const progress = getProgress();

  progress.stepTimes.push(time);

  // Keep only last 50 entries (avoid bloating cookie)
  if (progress.stepTimes.length > 50) {
    progress.stepTimes.shift();
  }

  saveProgress(progress);
};

export const addCompletedQuest = (title: string) => {
  const progress = getProgress();

  // prevent duplicates
  if (!progress.completedQuests.includes(title)) {
    progress.completedQuests.push(title);
  }

  saveProgress(progress);
};