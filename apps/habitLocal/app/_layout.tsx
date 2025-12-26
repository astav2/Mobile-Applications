import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useHabitStore } from '../stores/useHabitStore';

export default function RootLayout() {
  const darkMode = useHabitStore((state) => state.settings.darkMode);

  return (
    <>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="habit/[id]" />
      </Stack>
    </>
  );
}
