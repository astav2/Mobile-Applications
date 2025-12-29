import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../../hooks/useHabits';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useHabitStore } from '../../stores/useHabitStore';
import { HabitRow } from '../../components/HabitRow';
import { colors, spacing, fontSize } from '../../constants/theme';
import { formatDate, isWithinEditWindow } from '../../utils/date';

export default function DayEditScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const router = useRouter();
  const { habitsWithStreaks } = useHabits();
  const darkMode = useDarkMode();
  const theme = darkMode ? colors.dark : colors.light;
  const toggleHabitForDate = useHabitStore((state) => state.toggleHabitForDate);

  if (!date) {
    return null;
  }

  const dateObj = new Date(date);
  const formattedDate = formatDate(dateObj);

  // Check edit permissions for each habit
  const habitsWithEditPermission = habitsWithStreaks.map((habit) => {
    const canEdit = isWithinEditWindow(date, habit.createdAt);
    return { ...habit, canEdit };
  });

  const handleToggleHabit = (habitId: string, canEdit: boolean) => {
    if (!canEdit) {
      Alert.alert('Locked', 'This habit cannot be edited (>7 days old or created after this date)', [
        { text: 'OK' },
      ]);
      return;
    }

    toggleHabitForDate(habitId, date);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Edit Day</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {formattedDate}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {habitsWithEditPermission.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No habits for this date
            </Text>
          </View>
        ) : (
          habitsWithEditPermission.map((habit) => (
            <View key={habit.id} style={styles.habitItem}>
              <HabitRow
                habit={habit}
                isDark={darkMode}
                onToggle={() => handleToggleHabit(habit.id, habit.canEdit)}
                forceDate={date}
              />
              {!habit.canEdit && (
                <View style={styles.lockBadge}>
                  <Ionicons name="lock-closed" size={12} color={theme.textSecondary} />
                  <Text style={[styles.lockText, { color: theme.textSecondary }]}>Locked</Text>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginTop: spacing.lg,
  },
  habitItem: {
    position: 'relative',
  },
  lockBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  lockText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
