import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { requestNotificationPermissions } from '../services/notifications';

export default function RootLayout() {
  const darkMode = useDarkMode();

  useEffect(() => {
    // Request notification permissions on app launch
    requestNotificationPermissions().catch((error) => {
      console.error('Failed to request notification permissions:', error);
    });
  }, []);

  return (
    <>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="habit/[id]" />
        <Stack.Screen name="day/[date]" />
      </Stack>
    </>
  );
}
