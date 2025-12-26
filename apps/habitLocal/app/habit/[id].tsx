import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useHabitStore } from '../../stores/useHabitStore';
import { useDarkMode } from '../../hooks/useDarkMode';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { formatShortDate } from '../../utils/date';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  getCompletionPercentageForMonth,
} from '../../utils/streaks';

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const habits = useHabitStore((state) => state.habits);
  const logs = useHabitStore((state) => state.logs);
  const darkMode = useDarkMode();
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const editHabit = useHabitStore((state) => state.editHabit);

  const theme = darkMode ? colors.dark : colors.light;

  const habit = habits.find((h) => h.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(habit?.name || '');

  if (!habit) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Habit not found</Text>
      </View>
    );
  }

  const currentStreak = calculateCurrentStreak(habit.id, logs);
  const longestStreak = calculateLongestStreak(habit.id, logs);
  const createdDate = new Date(habit.createdAt);

  const today = new Date();
  const completionPercentage = getCompletionPercentageForMonth(
    habit.id,
    today.getFullYear(),
    today.getMonth(),
    logs
  );

  const handleDelete = () => {
    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habit.name}"? This will remove all associated data.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteHabit(habit.id);
            router.back();
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    if (isEditing && editedName.trim() && editedName !== habit.name) {
      editHabit(habit.id, editedName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          {isEditing ? (
            <TextInput
              style={[styles.editInput, { color: theme.text, borderColor: theme.border }]}
              value={editedName}
              onChangeText={setEditedName}
              autoFocus={true}
            />
          ) : (
            <Text style={[styles.habitName, { color: theme.text }]} numberOfLines={1}>
              {habit.name}
            </Text>
          )}
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.streakContainer}>
          <Text style={[styles.streakNumber, { color: theme.primary }]}>
            {currentStreak}
          </Text>
          <Text style={[styles.streakLabel, { color: theme.textSecondary }]}>
            🔥 Current Streak
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {longestStreak}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Longest Streak
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {formatShortDate(createdDate)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Started
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            This Month: {completionPercentage}%
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
            Completion rate for current month
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={handleEdit}
          >
            <Ionicons
              name={isEditing ? 'checkmark' : 'create-outline'}
              size={20}
              color={theme.text}
            />
            <Text style={[styles.buttonText, { color: theme.text }]}>
              {isEditing ? 'Save' : 'Edit Name'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.surface, borderColor: theme.danger }]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={20} color={theme.danger} />
            <Text style={[styles.buttonText, { color: theme.danger }]}>Delete</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingTop: spacing.xl + 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  habitName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
  },
  editInput: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  streakContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  streakNumber: {
    fontSize: 72,
    fontWeight: '700',
  },
  streakLabel: {
    fontSize: fontSize.lg,
    marginTop: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  divider: {
    width: 1,
    height: 40,
  },
  card: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.xl,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: fontSize.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: spacing.xs,
  },
  buttonText: {
    fontSize: fontSize.md,
    fontWeight: '500',
  },
});
