import { useMemo } from 'react';
import { useHabitStore } from '../stores/useHabitStore';
import { HabitWithStreak } from '../types';
import { getTodayString } from '../utils/date';
import { calculateCurrentStreak, calculateLongestStreak, isHabitCompletedOnDate } from '../utils/streaks';

export function useHabits() {
  const habits = useHabitStore((state) => state.habits);
  const logs = useHabitStore((state) => state.logs);
  const addHabit = useHabitStore((state) => state.addHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const editHabit = useHabitStore((state) => state.editHabit);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);

  const habitsWithStreaks: HabitWithStreak[] = useMemo(() => {
    const today = getTodayString();

    return habits.map((habit) => ({
      ...habit,
      currentStreak: calculateCurrentStreak(habit.id, logs),
      longestStreak: calculateLongestStreak(habit.id, logs),
      isCompletedToday: isHabitCompletedOnDate(habit.id, today, logs),
    }));
  }, [habits, logs]);

  return {
    habits,
    habitsWithStreaks,
    addHabit,
    deleteHabit,
    editHabit,
    toggleHabit,
  };
}
