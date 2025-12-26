# Apps Directory

This directory contains all individual mobile applications. Each app is a self-contained Expo project.

## 🚀 Quick Start for New App

### Option 1: Manual Setup

1. Create new Expo app:
   ```bash
   cd apps
   npx create-expo-app [app-name] --template blank-typescript
   cd [app-name]
   ```

2. Install dependencies:
   ```bash
   npm install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar zustand @react-native-async-storage/async-storage @expo/vector-icons --legacy-peer-deps
   ```

3. Update `package.json`:
   ```json
   {
     "main": "expo-router/entry"
   }
   ```

4. Update `app.json` to add expo-router plugin:
   ```json
   {
     "expo": {
       "plugins": ["expo-router"],
       "scheme": "[your-app-scheme]"
     }
   }
   ```

5. Set up folder structure:
   ```
   [app-name]/
   ├── app/
   │   ├── (tabs)/
   │   │   ├── _layout.tsx
   │   │   ├── index.tsx
   │   │   └── settings.tsx
   │   └── _layout.tsx
   ├── components/
   │   ├── ui/
   │   └── features/
   ├── hooks/
   ├── stores/
   ├── utils/
   ├── constants/
   ├── types/
   └── assets/
   ```

### Option 2: Copy from Template (Coming Soon)
   ```bash
   cp -r apps/_template apps/[app-name]
   cd apps/[app-name]
   npm install
   ```

## 📱 Running an App

```bash
cd apps/[app-name]
npx expo start --tunnel
```

Then scan the QR code with Expo Go on your Android device.

## 🧩 Using Shared Code

Import shared resources from the root `shared/` directory:

```typescript
import { colors } from '../../shared/constants/theme';
import { Button } from '../../shared/components/Button';
import { useAsyncStorage } from '../../shared/hooks/useAsyncStorage';
```

## 📝 App Checklist

Each app should have:
- [ ] Unique app name and slug in `app.json`
- [ ] Unique bundle identifier (iOS) and package name (Android)
- [ ] Proper `README.md` describing the app
- [ ] Expo Router configured
- [ ] TypeScript strict mode enabled
- [ ] Offline-first architecture

## 🏗️ Recommended Structure

```typescript
// app/_layout.tsx - Root layout
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
```

```typescript
// app/(tabs)/_layout.tsx - Tab navigation
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

## 🎯 Coding Standards

Follow the coding standards defined in the root README.md:
- TypeScript strict mode
- Functional components only
- Components under 150 lines
- Use shared theme for colors/spacing
- Offline-first approach
