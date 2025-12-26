export interface Habit {
  id: string;
  name: string;
  createdAt: string; // ISO date string
}

export interface DayLog {
  date: string; // 'YYYY-MM-DD'
  completedHabits: string[]; // habit IDs completed on this day
}

export interface Settings {
  darkMode: boolean;
}

export interface HabitState {
  habits: Habit[];
  logs: DayLog[];
  settings: Settings;
  // Actions
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  editHabit: (id: string, name: string) => void;
  toggleHabit: (habitId: string, date: string) => void;
  toggleDarkMode: () => void;
  clearAllData: () => void;
}

export interface StreakInfo {
  current: number;
  longest: number;
}

export interface HabitWithStreak extends Habit {
  currentStreak: number;
  longestStreak: number;
  isCompletedToday: boolean;
}

export interface InsightStats {
  todayCompleted: number;
  todayTotal: number;
  weekCompleted: number;
  weekTotal: number;
  bestStreakHabit: string | null;
  bestStreakCount: number;
}
