import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { HabitWithStreak } from '../types';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { useHabitStore } from '../stores/useHabitStore';
import { getTodayString } from '../utils/date';

interface HabitRowProps {
  habit: HabitWithStreak;
  isDark: boolean;
}

export function HabitRow({ habit, isDark }: HabitRowProps) {
  const router = useRouter();
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const theme = isDark ? colors.dark : colors.light;

  const handleToggle = () => {
    toggleHabit(habit.id, getTodayString());
  };

  const handlePress = () => {
    router.push(`/habit/${habit.id}`);
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor: theme.surface }]}
      onPress={handlePress}
    >
      <TouchableOpacity
        style={[
          styles.circle,
          {
            borderColor: theme.primary,
            backgroundColor: habit.isCompletedToday ? theme.primary : 'transparent',
          },
        ]}
        onPress={handleToggle}
      >
        {habit.isCompletedToday && <View style={styles.checkmark} />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.text }]}>{habit.name}</Text>
        {habit.currentStreak > 0 && (
          <Text style={[styles.streak, { color: theme.textSecondary }]}>
            🔥 {habit.currentStreak} day{habit.currentStreak !== 1 ? 's' : ''}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 16,
    height: 16,
    borderRadius: borderRadius.full,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: 2,
  },
  streak: {
    fontSize: fontSize.sm,
  },
});
