import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { HeatMapCell } from './HeatMapCell';
import { useHabitStore } from '../stores/useHabitStore';
import { colors, spacing, fontSize } from '../constants/theme';
import {
  getDaysInMonth,
  getMonthName,
  getFirstDayOfMonth,
  getDateString,
  isFuture,
} from '../utils/date';
import { getTotalCompletionsForDate } from '../utils/streaks';

interface HeatMapProps {
  habitId?: string; // If provided, show heat map for specific habit only
  isDark: boolean;
  onCellPress?: (date: string) => void;
}

export function HeatMap({ habitId, isDark, onCellPress }: HeatMapProps) {
  const habits = useHabitStore((state) => state.habits);
  const logs = useHabitStore((state) => state.logs);
  const theme = isDark ? colors.dark : colors.light;

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const monthName = getMonthName(currentMonth);

  const totalHabits = habitId ? 1 : habits.length;

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getCompletedCount = (dateString: string): number => {
    if (habitId) {
      // For single habit
      const log = logs.find((l) => l.date === dateString);
      return log?.completedHabits.includes(habitId) ? 1 : 0;
    } else {
      // For all habits
      return getTotalCompletionsForDate(dateString, logs);
    }
  };

  // Create calendar grid
  const calendarDays = [];

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = getDateString(date);
    const completed = getCompletedCount(dateString);
    const isDateFuture = isFuture(dateString);

    calendarDays.push(
      <HeatMapCell
        key={dateString}
        date={dateString}
        completed={completed}
        total={totalHabits}
        isFuture={isDateFuture}
        isDark={isDark}
        onPress={onCellPress}
        size={40}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.monthText, { color: theme.text }]}>
          {monthName} {currentYear}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <Ionicons name="chevron-forward" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={[styles.weekDay, { color: theme.textSecondary }]}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>{calendarDays}</View>

      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: theme.textSecondary }]}>Less</Text>
        <HeatMapCell completed={0} total={4} isFuture={false} isDark={isDark} date="" size={16} />
        <HeatMapCell completed={1} total={4} isFuture={false} isDark={isDark} date="" size={16} />
        <HeatMapCell completed={2} total={4} isFuture={false} isDark={isDark} date="" size={16} />
        <HeatMapCell completed={3} total={4} isFuture={false} isDark={isDark} date="" size={16} />
        <HeatMapCell completed={4} total={4} isFuture={false} isDark={isDark} date="" size={16} />
        <Text style={[styles.legendText, { color: theme.textSecondary }]}>More</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  monthText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: 4,
  },
  weekDay: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  emptyCell: {
    width: 40,
    height: 40,
    marginRight: 0,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  legendText: {
    fontSize: fontSize.sm,
  },
});
