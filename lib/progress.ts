import Cookies from "js-cookie";

const KEY = "genlink_progress";

export type Progress = {
  xp: number;
  level: number;
  completedQuests: string[];
};

// Get progress
export const getProgress = (): Progress => {
  const data = Cookies.get(KEY);

  if (!data) {
    return {
      xp: 0,
      level: 1,
      completedQuests: [],
    };
  }

  return JSON.parse(data);
};

// Save progress
export const saveProgress = (progress: Progress) => {
  Cookies.set(KEY, JSON.stringify(progress), { expires: 180 }); // 6 months
};
