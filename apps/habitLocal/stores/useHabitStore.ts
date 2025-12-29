import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HabitState, Habit, DayLog, NotificationSettings } from '../types';
import { generateId } from '../utils/helpers';
import { getTodayString } from '../utils/date';

const initialNotifications: NotificationSettings = {
  eveningReminder: false,
  morningStats: false,
  weeklyDigest: false,
  monthlyDigest: false,
  streakSaver: false,
};

const initialSettings = {
  darkMode: false,
  notifications: initialNotifications,
};

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      logs: [],
      settings: initialSettings,

      addHabit: (name: string) => {
        const newHabit: Habit = {
          id: generateId(),
          name: name.trim(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },

      deleteHabit: (id: string) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
          logs: state.logs.map((log) => ({
            ...log,
            completedHabits: log.completedHabits.filter((hId) => hId !== id),
          })),
        }));
      },

      editHabit: (id: string, name: string) => {
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, name: name.trim() } : h
          ),
        }));
      },

      toggleHabit: (habitId: string, date: string) => {
        set((state) => {
          const existingLog = state.logs.find((log) => log.date === date);

          if (existingLog) {
            // Log exists for this date
            const isCompleted = existingLog.completedHabits.includes(habitId);

            return {
              logs: state.logs.map((log) =>
                log.date === date
                  ? {
                      ...log,
                      completedHabits: isCompleted
                        ? log.completedHabits.filter((id) => id !== habitId)
                        : [...log.completedHabits, habitId],
                    }
                  : log
              ),
            };
          } else {
            // Create new log for this date
            const newLog: DayLog = {
              date,
              completedHabits: [habitId],
            };
            return {
              logs: [...state.logs, newLog],
            };
          }
        });
      },

      toggleDarkMode: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            darkMode: !state.settings.darkMode,
          },
        }));
      },

      toggleNotification: (key: keyof NotificationSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: {
              ...state.settings.notifications,
              [key]: !state.settings.notifications[key],
            },
          },
        }));
      },

      toggleHabitForDate: (habitId: string, date: string) => {
        // Same as toggleHabit - allows editing past dates
        set((state) => {
          const existingLog = state.logs.find((log) => log.date === date);

          if (existingLog) {
            const isCompleted = existingLog.completedHabits.includes(habitId);

            return {
              logs: state.logs.map((log) =>
                log.date === date
                  ? {
                      ...log,
                      completedHabits: isCompleted
                        ? log.completedHabits.filter((id) => id !== habitId)
                        : [...log.completedHabits, habitId],
                    }
                  : log
              ),
            };
          } else {
            const newLog: DayLog = {
              date,
              completedHabits: [habitId],
            };
            return {
              logs: [...state.logs, newLog],
            };
          }
        });
      },

      clearAllData: () => {
        set({
          habits: [],
          logs: [],
          settings: initialSettings,
        });
      },
    }),
    {
      name: 'habit-storage',
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persistedState: any, version: number) => {
        // Ensure all settings are properly initialized and typed
        if (persistedState && persistedState.settings) {
          // Ensure darkMode is always a boolean
          persistedState.settings.darkMode = Boolean(persistedState.settings.darkMode);

          // Initialize notifications if missing or ensure all fields are booleans
          if (!persistedState.settings.notifications) {
            persistedState.settings.notifications = initialNotifications;
          } else {
            // Ensure all notification settings are booleans
            persistedState.settings.notifications = {
              eveningReminder: Boolean(persistedState.settings.notifications.eveningReminder),
              morningStats: Boolean(persistedState.settings.notifications.morningStats),
              weeklyDigest: Boolean(persistedState.settings.notifications.weeklyDigest),
              monthlyDigest: Boolean(persistedState.settings.notifications.monthlyDigest),
              streakSaver: Boolean(persistedState.settings.notifications.streakSaver),
            };
          }
        }
        return persistedState;
      },
    }
  )
);
