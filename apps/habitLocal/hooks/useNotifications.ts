import { useEffect } from 'react';
import { useHabitStore } from '../stores/useHabitStore';
import { scheduleNotifications } from '../services/notifications';
import { getYesterdayString, getTodayString } from '../utils/date';
import { calculateCurrentStreak } from '../utils/streaks';

export function useNotifications() {
  const settings = useHabitStore((state) => state.settings);
  const habits = useHabitStore((state) => state.habits);
  const logs = useHabitStore((state) => state.logs);

  useEffect(() => {
    // Calculate stats for notification personalization
    const yesterdayString = getYesterdayString();
    const yesterdayLog = logs.find((log) => log.date === yesterdayString);
    const yesterdayCompleted = yesterdayLog?.completedHabits.length || 0;

    // Find longest active streak
    let longestActiveStreak = 0;
    let hasActiveStreaks = false;

    habits.forEach((habit) => {
      const streak = calculateCurrentStreak(habit.id, logs);
      if (streak > 0) {
        hasActiveStreaks = true;
        if (streak > longestActiveStreak) {
          longestActiveStreak = streak;
        }
      }
    });

    const habitStats = {
      totalHabits: habits.length,
      yesterdayCompleted,
      hasActiveStreaks,
      longestActiveStreak,
    };

    // Schedule notifications based on current settings
    scheduleNotifications(settings.notifications, habitStats).catch((error) => {
      console.error('Failed to schedule notifications:', error);
    });
  }, [settings.notifications, habits.length, logs]);

  return null;
}
