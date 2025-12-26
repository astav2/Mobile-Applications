import { StyleSheet, View, Text } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  isDark: boolean;
}

export function StatsCard({ title, value, subtitle, isDark }: StatsCardProps) {
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.textSecondary }]}>{title}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      {subtitle && <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
});
