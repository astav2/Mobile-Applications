import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { NotificationSettings } from '../types';

// Set notification handler to define how notifications are handled when app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function scheduleNotifications(
  settings: NotificationSettings,
  habitStats: {
    totalHabits: number;
    yesterdayCompleted: number;
    hasActiveStreaks: boolean;
    longestActiveStreak: number;
  }
): Promise<void> {
  // Cancel all existing notifications first
  await cancelAllNotifications();

  // Evening Reminder (8 PM daily)
  if (settings.eveningReminder) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Evening Check-in',
        body: "Don't forget to log today's habits!",
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });
  }

  // Morning Stats (9 AM daily)
  if (settings.morningStats && habitStats.totalHabits > 0) {
    const completionText =
      habitStats.yesterdayCompleted > 0
        ? `You completed ${habitStats.yesterdayCompleted}/${habitStats.totalHabits} habits yesterday. Keep it up!`
        : `Start fresh today! You have ${habitStats.totalHabits} habits to track.`;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Good Morning',
        body: completionText,
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });
  }

  // Weekly Digest (Sunday 7 PM)
  if (settings.weeklyDigest) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Weekly Summary',
        body: 'Check your weekly progress in the Insights tab!',
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        weekday: 1, // Sunday
        hour: 19,
        minute: 0,
        repeats: true,
      },
    });
  }

  // Monthly Digest (1st of month, 7 PM)
  if (settings.monthlyDigest) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Monthly Summary',
        body: 'See how you did last month in your habit tracking!',
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        day: 1,
        hour: 19,
        minute: 0,
        repeats: true,
      },
    });
  }

  // Streak Saver (11:30 PM daily)
  if (settings.streakSaver && habitStats.hasActiveStreaks) {
    const streakText =
      habitStats.longestActiveStreak > 1
        ? `Your ${habitStats.longestActiveStreak}-day streak is about to break! Log now?`
        : 'Log your habits before midnight to keep your streak!';

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Streak Alert',
        body: streakText,
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: 23,
        minute: 30,
        repeats: true,
      },
    });
  }
}

export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  return await Notifications.getAllScheduledNotificationsAsync();
}

export async function testNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Test Notification',
      body: 'Notifications are working!',
      sound: false,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
}
