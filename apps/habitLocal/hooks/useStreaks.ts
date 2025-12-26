import { useMemo } from 'react';
import { useHabitStore } from '../stores/useHabitStore';
import { InsightStats } from '../types';
import { getTodayString, getWeekDates } from '../utils/date';
import { calculateCurrentStreak, isHabitCompletedOnDate } from '../utils/streaks';

export function useStreaks() {
  const habits = useHabitStore((state) => state.habits);
  const logs = useHabitStore((state) => state.logs);

  const stats: InsightStats = useMemo(() => {
    const today = getTodayString();
    const weekDates = getWeekDates();

    // Today stats
    const todayTotal = habits.length;
    const todayCompleted = habits.filter((h) =>
      isHabitCompletedOnDate(h.id, today, logs)
    ).length;

    // Week stats
    const weekTotal = habits.length * 7;
    let weekCompleted = 0;
    weekDates.forEach((date) => {
      habits.forEach((habit) => {
        if (isHabitCompletedOnDate(habit.id, date, logs)) {
          weekCompleted++;
        }
      });
    });

    // Best streak
    let bestStreakHabit: string | null = null;
    let bestStreakCount = 0;

    habits.forEach((habit) => {
      const streak = calculateCurrentStreak(habit.id, logs);
      if (streak > bestStreakCount) {
        bestStreakCount = streak;
        bestStreakHabit = habit.name;
      }
    });

    return {
      todayCompleted,
      todayTotal,
      weekCompleted,
      weekTotal,
      bestStreakHabit,
      bestStreakCount,
    };
  }, [habits, logs]);

  return stats;
}
