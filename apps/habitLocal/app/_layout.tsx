import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useDarkMode } from '../hooks/useDarkMode';

export default function RootLayout() {
  const darkMode = useDarkMode();

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
