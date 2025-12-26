import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useStreaks } from '../../hooks/useStreaks';
import { useDarkMode } from '../../hooks/useDarkMode';
import { StatsCard } from '../../components/StatsCard';
import { HeatMap } from '../../components/HeatMap';
import { colors, spacing, fontSize } from '../../constants/theme';

export default function InsightsScreen() {
  const stats = useStreaks();
  const darkMode = useDarkMode();
  const theme = darkMode ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Overview</Text>

        <View style={styles.statsRow}>
          <View style={styles.statHalf}>
            <StatsCard
              title="Today"
              value={`${stats.todayCompleted}/${stats.todayTotal}`}
              subtitle={
                stats.todayTotal > 0
                  ? `${Math.round((stats.todayCompleted / stats.todayTotal) * 100)}%`
                  : '0%'
              }
              isDark={darkMode}
            />
          </View>
          <View style={styles.statHalf}>
            <StatsCard
              title="This Week"
              value={`${stats.weekCompleted}/${stats.weekTotal}`}
              subtitle={
                stats.weekTotal > 0
                  ? `${Math.round((stats.weekCompleted / stats.weekTotal) * 100)}%`
                  : '0%'
              }
              isDark={darkMode}
            />
          </View>
        </View>

        {stats.bestStreakCount > 0 && (
          <StatsCard
            title="Best Streak"
            value={stats.bestStreakHabit || ''}
            subtitle={`🔥 ${stats.bestStreakCount} day${stats.bestStreakCount !== 1 ? 's' : ''}`}
            isDark={darkMode}
          />
        )}

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Activity</Text>

        <HeatMap isDark={darkMode} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statHalf: {
    flex: 1,
  },
});
