import { DayLog } from '../types';
import { getTodayString, getYesterdayString, getDateString, addDays } from './date';

export function calculateCurrentStreak(habitId: string, logs: DayLog[]): number {
  const today = getTodayString();
  const yesterday = getYesterdayString();

  // Check if completed today
  const todayLog = logs.find(log => log.date === today);
  const completedToday = todayLog?.completedHabits.includes(habitId) || false;

  // If not completed today, start from yesterday
  let currentDate = completedToday ? today : yesterday;
  let streak = 0;

  // Count backwards from current date
  while (true) {
    const log = logs.find(l => l.date === currentDate);
    if (log && log.completedHabits.includes(habitId)) {
      streak++;
      // Go to previous day
      const date = new Date(currentDate);
      date.setDate(date.getDate() - 1);
      currentDate = getDateString(date);
    } else {
      break;
    }
  }

  return streak;
}

export function calculateLongestStreak(habitId: string, logs: DayLog[]): number {
  // Get all dates where habit was completed
  const completedDates = logs
    .filter(log => log.completedHabits.includes(habitId))
    .map(log => log.date)
    .sort();

  if (completedDates.length === 0) return 0;

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < completedDates.length; i++) {
    const prevDate = new Date(completedDates[i - 1]);
    const currDate = new Date(completedDates[i]);

    // Check if dates are consecutive
    const dayDiff = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (dayDiff === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
}

export function isHabitCompletedOnDate(
  habitId: string,
  date: string,
  logs: DayLog[]
): boolean {
  const log = logs.find(l => l.date === date);
  return log?.completedHabits.includes(habitId) || false;
}

export function getCompletionPercentageForMonth(
  habitId: string,
  year: number,
  month: number,
  logs: DayLog[]
): number {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Only count days up to today if current month
  const daysToCount = isCurrentMonth ? today.getDate() : daysInMonth;
  let completedDays = 0;

  for (let day = 1; day <= daysToCount; day++) {
    const date = new Date(year, month, day);
    const dateString = getDateString(date);
    if (isHabitCompletedOnDate(habitId, dateString, logs)) {
      completedDays++;
    }
  }

  return daysToCount > 0 ? Math.round((completedDays / daysToCount) * 100) : 0;
}

export function getTotalCompletionsForDate(date: string, logs: DayLog[]): number {
  const log = logs.find(l => l.date === date);
  return log?.completedHabits.length || 0;
}
