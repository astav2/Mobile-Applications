import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';
import { useAppStore } from '../../stores/useAppStore';

export default function SettingsScreen() {
  const { settings } = useAppStore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Storage Status</Text>
            <Text style={styles.settingValue}>
              {settings?.offlineMode ? 'Offline Mode' : 'Online'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    padding: spacing.md,
    backgroundColor: colors.backgroundSecondary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  settingLabel: {
    ...typography.body,
    color: colors.text,
  },
  settingValue: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
