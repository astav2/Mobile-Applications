import { useHabitStore } from '../stores/useHabitStore';

export function useDarkMode(): boolean {
  const darkMode = useHabitStore((state) => state.settings.darkMode);
  // Force to strict boolean - handles undefined, null, "true", "false", etc.
  return darkMode === true;
}
