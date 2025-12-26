import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../../hooks/useHabits';
import { useDarkMode } from '../../hooks/useDarkMode';
import { HabitRow } from '../../components/HabitRow';
import { AddHabitModal } from '../../components/AddHabitModal';
import { colors, spacing, fontSize } from '../../constants/theme';
import { formatDate, getTodayString } from '../../utils/date';

export default function TodayScreen() {
  const { habitsWithStreaks, addHabit } = useHabits();
  const darkMode = useDarkMode();
  const theme = darkMode ? colors.dark : colors.light;
  const [modalVisible, setModalVisible] = useState(false);

  const today = new Date();
  const dateSubtitle = formatDate(today);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Today</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {dateSubtitle}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {habitsWithStreaks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No habits yet
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
              Tap + to add your first habit
            </Text>
          </View>
        ) : (
          habitsWithStreaks.map((habit) => (
            <HabitRow key={habit.id} habit={habit} isDark={darkMode} />
          ))
        )}
      </ScrollView>

      <AddHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addHabit}
        isDark={darkMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
  emptySubtext: {
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
});
