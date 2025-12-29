import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useHabitStore } from '../../stores/useHabitStore';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useNotifications } from '../../hooks/useNotifications';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { NotificationSettings } from '../../types';

export default function SettingsScreen() {
  const darkMode = useDarkMode();
  const toggleDarkMode = useHabitStore((state) => state.toggleDarkMode);
  const toggleNotification = useHabitStore((state) => state.toggleNotification);
  const clearAllData = useHabitStore((state) => state.clearAllData);
  const notifications = useHabitStore((state) => state.settings.notifications);
  const theme = darkMode ? colors.dark : colors.light;

  // Initialize and manage notifications
  useNotifications();

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your habits and progress. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearAllData,
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          Appearance
        </Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Use dark theme throughout the app
              </Text>
            </View>
            <Switch
              value={Boolean(darkMode)}
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          Notifications
        </Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Evening Reminder
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                8 PM daily reminder to log habits
              </Text>
            </View>
            <Switch
              value={Boolean(notifications.eveningReminder)}
              onValueChange={() => toggleNotification('eveningReminder')}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Morning Stats</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                9 AM daily summary of yesterday
              </Text>
            </View>
            <Switch
              value={Boolean(notifications.morningStats)}
              onValueChange={() => toggleNotification('morningStats')}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Weekly Digest</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Sunday evening weekly summary
              </Text>
            </View>
            <Switch
              value={Boolean(notifications.weeklyDigest)}
              onValueChange={() => toggleNotification('weeklyDigest')}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Monthly Digest</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                First of month summary
              </Text>
            </View>
            <Switch
              value={Boolean(notifications.monthlyDigest)}
              onValueChange={() => toggleNotification('monthlyDigest')}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Streak Saver</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                11:30 PM reminder if habits incomplete
              </Text>
            </View>
            <Switch
              value={Boolean(notifications.streakSaver)}
              onValueChange={() => toggleNotification('streakSaver')}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Data</Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <TouchableOpacity style={styles.settingRow} disabled={true}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>
                Export Data
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Coming soon
              </Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity style={styles.settingRow} onPress={handleClearData}>
            <View>
              <Text style={[styles.settingLabel, { color: theme.danger }]}>
                Clear All Data
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Delete all habits and progress
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>About</Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Version</Text>
            <Text style={[styles.settingValue, { color: theme.textSecondary }]}>1.0</Text>
          </View>
        </View>
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
    fontSize: fontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingLabel: {
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: fontSize.sm,
  },
  settingValue: {
    fontSize: fontSize.md,
  },
  divider: {
    height: 1,
  },
});
