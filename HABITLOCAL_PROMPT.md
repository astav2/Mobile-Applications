# PROJECT: habitLocal

## OVERVIEW
A minimalist offline-first habit tracker Android app. Ultra-clean UI, tab-based navigation, streak tracking, and heat map insights. Built with Expo for testing via Expo Go on Android.

## MONOREPO CONTEXT
This app lives in the Mobile-Applications monorepo:
- App location: `apps/habitLocal/`
- Shared code: `../../shared/` (components, hooks, utils, constants)
- Each app is independent with its own dependencies

## TECH STACK (STRICT)
- Framework: Expo SDK 52+ (managed workflow)
- Routing: Expo Router (file-based)
- Language: TypeScript (strict)
- Styling: React Native StyleSheet only
- State: Zustand with persist middleware
- Storage: @react-native-async-storage/async-storage
- Icons: @expo/vector-icons (Ionicons set)
- No external UI libraries

## PROJECT STRUCTURE

```
apps/habitLocal/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Tab bar config (Today, Insights, Settings)
│   │   ├── index.tsx          # Today screen (home)
│   │   ├── insights.tsx       # Insights + heat map
│   │   └── settings.tsx       # Settings screen
│   ├── _layout.tsx            # Root layout with providers
│   ├── habit/
│   │   └── [id].tsx           # Habit detail screen
│   └── +not-found.tsx
├── components/
│   ├── HabitRow.tsx           # Single habit item for Today list
│   ├── HeatMap.tsx            # Monthly heat map grid
│   ├── HeatMapCell.tsx        # Individual heat map cell
│   ├── StatsCard.tsx          # Stat display (streak, completion)
│   └── AddHabitModal.tsx      # Modal for adding new habit
├── stores/
│   └── useHabitStore.ts       # Zustand store with persist
├── hooks/
│   ├── useHabits.ts           # Habit CRUD operations
│   └── useStreaks.ts          # Streak calculation logic
├── utils/
│   ├── date.ts                # Date formatting helpers
│   └── streaks.ts             # Streak calculation functions
├── constants/
│   └── theme.ts               # habitLocal-specific theme (extends shared)
├── types/
│   └── index.ts               # All TypeScript interfaces
├── assets/
│   ├── icon.png
│   ├── adaptive-icon.png
│   └── splash-icon.png
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## USING SHARED CODE

Import from monorepo shared folder:

```typescript
// Shared components
import { Button } from '../../../shared/components/Button';

// Shared hooks
import { useAsyncStorage } from '../../../shared/hooks/useAsyncStorage';

// Shared utils
import { formatDate, generateId } from '../../../shared/utils/helpers';

// Shared theme (base colors/spacing - extend in app's theme.ts)
import { colors as sharedColors, spacing } from '../../../shared/constants/theme';
```

## DATA MODEL (types/index.ts)

```typescript
export interface Habit {
  id: string;
  name: string;
  createdAt: string; // ISO date string
}

export interface DayLog {
  date: string; // 'YYYY-MM-DD'
  completedHabits: string[]; // habit IDs completed on this day
}

export interface Settings {
  darkMode: boolean;
}

export interface HabitState {
  habits: Habit[];
  logs: DayLog[];
  settings: Settings;
  // Actions
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  editHabit: (id: string, name: string) => void;
  toggleHabit: (habitId: string, date: string) => void;
  toggleDarkMode: () => void;
  clearAllData: () => void;
}
```

## SCREEN SPECIFICATIONS

### Tab 1: Today (app/(tabs)/index.tsx)

- Header: "Today" with date subtitle (e.g., "Thursday, Dec 26")
- Top right: "+" button to open AddHabitModal
- List of habits, each showing:
  - Circle indicator (empty = not done, filled = done)
  - Habit name
  - Current streak with 🔥 emoji
- Tap circle: toggles completion for today
- Tap row (not circle): navigates to habit detail
- Empty state: "No habits yet. Tap + to add one."

### Tab 2: Insights (app/(tabs)/insights.tsx)

- Header: "Insights"
- Stats card showing:
  - Total Today: X/Y completed
  - This Week: X/Y completed
  - Best Streak: habit name + streak count 🔥
- Heat map section:
  - Month/year header with left/right arrows to navigate months
  - 7-column grid (M T W T F S S)
  - Cell colors based on daily completion:
    - Dark/filled: all habits completed
    - Medium: some habits completed
    - Light/empty: no habits completed
    - Muted/dot: future dates
  - Legend below heat map

### Tab 3: Settings (app/(tabs)/settings.tsx)

- Header: "Settings"
- Sections with cards:
  - Appearance: Dark Mode toggle switch
  - Data: Export Data (future), Clear All Data (with confirmation alert)
  - About: Version 1.0

### Habit Detail (app/habit/[id].tsx)

- Header: Back arrow + habit name
- Current streak display (large, centered) with 🔥
- Stats row: Longest streak | Started date
- Heat map for this specific habit only:
  - Shows ● for completed, ○ for missed, · for future
  - Month navigation arrows
  - Completion percentage for displayed month
- Footer buttons: Edit Name | Delete (with confirmation)

### Add Habit Modal (components/AddHabitModal.tsx)

- Modal overlay with card
- "New Habit" title
- Single text input for habit name
- "Add Habit" button (disabled if empty)
- X button to close

## THEME (constants/theme.ts)

Extend shared theme with habitLocal-specific colors:

```typescript
import { spacing, typography } from '../../../shared/constants/theme';

export { spacing, typography };

export const colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1A1A1A',
    textSecondary: '#6B6B6B',
    primary: '#2563EB',
    success: '#10B981',
    danger: '#EF4444',
    border: '#E5E5E5',
    heatEmpty: '#F0F0F0',
    heatPartial: '#93C5FD',
    heatFull: '#2563EB',
    heatFuture: '#D1D5DB',
  },
  dark: {
    background: '#0A0A0A',
    surface: '#1A1A1A',
    text: '#FAFAFA',
    textSecondary: '#A1A1A1',
    primary: '#3B82F6',
    success: '#34D399',
    danger: '#F87171',
    border: '#2D2D2D',
    heatEmpty: '#1F1F1F',
    heatPartial: '#1E40AF',
    heatFull: '#3B82F6',
    heatFuture: '#374151',
  },
};

export const fontSize = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
};
```

## STREAK CALCULATION LOGIC (utils/streaks.ts)

- Current streak: Count consecutive days backward from today where habit was completed
- Longest streak: Find max consecutive completed days in all logs for a habit
- If today is not yet completed but yesterday was, current streak = yesterday's streak (give user chance to complete today)

## CODING STANDARDS

1. Functional components with hooks only
2. All props typed with interfaces
3. No inline styles - use StyleSheet.create
4. Components under 150 lines
5. Extract business logic to hooks/utils
6. Use theme colors via useColorScheme or context
7. Descriptive names, no abbreviations
8. Brief comments for complex logic only
9. Leverage shared code when possible (utils, hooks)

## COMPONENT TEMPLATE

```tsx
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../constants/theme';

interface Props {
  // typed props
}

export function ComponentName({ }: Props) {
  return (
    <View style={styles.container}>
      {/* content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
```

## APP.JSON CONFIGURATION

```json
{
  "expo": {
    "name": "habitLocal",
    "slug": "habitlocal",
    "scheme": "habitlocal",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.habitlocal"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.habitlocal"
    },
    "plugins": ["expo-router"]
  }
}
```

## PACKAGE.JSON ESSENTIALS

```json
{
  "name": "habitlocal",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "tunnel": "expo start --tunnel"
  }
}
```

## DEVELOPMENT WORKFLOW

### Navigate to app directory:
```bash
cd apps/habitLocal
```

### Run development server:
```bash
npx expo start --tunnel
```

### Build APK:
```bash
eas build -p android --profile preview
```

## IMPLEMENTATION TASK

Build habitLocal in `apps/habitLocal/` directory:

1. **Initialize**: Create Expo app in apps/habitLocal
2. **Dependencies**: Install zustand, async-storage, expo-router, etc.
3. **Structure**: Create folder structure as specified
4. **Types First**: Implement all TypeScript interfaces
5. **Theme**: Set up habitLocal theme (extending shared)
6. **Store**: Build Zustand store with AsyncStorage persistence
7. **Utils**: Implement date helpers and streak calculation
8. **Hooks**: Create useHabits and useStreaks
9. **UI Components**: Build HabitRow, HeatMap, StatsCard, etc.
10. **Screens**: Implement all screens per specifications
11. **Dark Mode**: Ensure theme switching works throughout
12. **Test**: Verify all interactions work correctly

Build incrementally: types → store → utils → hooks → components → screens

Commit after each major milestone with descriptive messages.

## MONOREPO NOTES

- This app is independent - has its own package.json and dependencies
- Can use shared code from `../../shared/` for common utilities
- Use `--legacy-peer-deps` if peer dependency conflicts arise
- Each app runs independently: `cd apps/habitLocal && npx expo start --tunnel`
