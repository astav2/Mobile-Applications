# habitLocal

A minimalist offline-first habit tracker for Android. Track your daily habits, view streaks, and visualize your progress with beautiful heat maps.

## Features

- **Offline-First**: All data stored locally with AsyncStorage
- **Streak Tracking**: Current and longest streaks for each habit
- **Heat Map Visualization**: Monthly view of all habit completions
- **Dark Mode**: Full dark mode support
- **Simple & Clean UI**: Minimalist design focused on usability

## Screens

### Today
- View all habits for today
- Quick toggle to mark habits complete
- See current streaks with 🔥 emoji
- Add new habits with + button

### Insights
- Today's completion stats
- Weekly completion stats
- Best streak across all habits
- Monthly heat map showing all activity

### Settings
- Dark mode toggle
- Clear all data option
- App version info

### Habit Detail
- View habit-specific stats
- Current and longest streak
- Month completion percentage
- Edit habit name
- Delete habit

## Tech Stack

- **Expo SDK 54** - React Native framework
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **Zustand** - State management with persist middleware
- **AsyncStorage** - Local data persistence
- **React Native StyleSheet** - Styling (no external UI libs)

## Development

### Prerequisites
- Node.js 18+
- Expo Go app on Android device

### Installation

```bash
cd apps/habitLocal
npm install
```

### Running

```bash
# Start with tunnel (for Expo Go)
npm run tunnel

# Or regular start
npm start
```

Scan the QR code with Expo Go on your Android device.

### Building APK

```bash
eas build -p android --profile preview
```

## Project Structure

```
habitLocal/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   ├── habit/[id].tsx     # Habit detail screen
│   └── _layout.tsx        # Root layout
├── components/            # UI components
├── stores/                # Zustand store
├── hooks/                 # Custom hooks
├── utils/                 # Helper functions
├── constants/             # Theme and config
└── types/                 # TypeScript types
```

## Shared Code

This app uses shared code from the monorepo:

- `shared/components/Button.tsx` - Reusable button component
- `shared/constants/theme.ts` - Base theme values
- `shared/utils/helpers.ts` - Common utilities
- `shared/hooks/useAsyncStorage.ts` - AsyncStorage hook

## Data Model

### Habit
```typescript
{
  id: string;
  name: string;
  createdAt: string; // ISO date
}
```

### DayLog
```typescript
{
  date: string; // 'YYYY-MM-DD'
  completedHabits: string[]; // habit IDs
}
```

## Streak Calculation

- **Current Streak**: Count consecutive days backward from today (or yesterday if today not completed)
- **Longest Streak**: Maximum consecutive completion days in all logs
- Streaks are calculated in real-time from logs data

## Contributing

This is part of the Mobile-Applications monorepo. Each app is independent with its own dependencies and configuration.

## License

MIT
