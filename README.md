# Mobile Applications Monorepo

A collection of offline-first Android mobile applications built with Expo, developed using GitHub Codespaces and tested on Android devices via Expo Go.

## 🏗️ Repository Structure

```
/Mobile-Applications
├── apps/                      # Individual mobile applications
│   ├── [app-name-1]/         # Each app is self-contained
│   ├── [app-name-2]/
│   └── [app-name-n]/
├── shared/                    # Shared code across applications
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Common React hooks
│   ├── utils/                # Helper functions
│   └── constants/            # Shared constants and themes
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- GitHub Codespaces (recommended) or local development environment
- Expo Go app installed on your Android device

### Running an App

1. Navigate to the specific app directory:
   ```bash
   cd apps/[app-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server with tunnel:
   ```bash
   npx expo start --tunnel
   ```

4. Scan the QR code with Expo Go on your Android device

## 📱 Applications

Each app in the `apps/` directory is a standalone Expo project with its own:
- Dependencies (`package.json`)
- Configuration (`app.json`)
- Source code (`app/`, `components/`, etc.)
- Documentation (`README.md`)

### App List
- **[habitLocal](apps/habitLocal/)** - Minimalist offline-first habit tracker with streak tracking and heat map visualization

## 🧩 Shared Code

The `shared/` directory contains reusable code that can be imported into any app:

```typescript
// Example: Using shared components
import { Button } from '../../shared/components/Button';

// Example: Using shared utilities
import { formatDate } from '../../shared/utils/helpers';
```

## 🛠️ Tech Stack

All applications follow these standards:

- **Framework**: Expo SDK 52+ (managed workflow)
- **Routing**: Expo Router (file-based)
- **Language**: TypeScript (strict mode)
- **Styling**: React Native StyleSheet
- **State Management**: Zustand
- **Local Storage**: @react-native-async-storage/async-storage
- **Icons**: @expo/vector-icons

## 📝 Development Workflow

### Creating a New App

1. Create a new directory in `apps/`:
   ```bash
   cd apps
   npx create-expo-app [app-name] --template blank-typescript
   ```

2. Install common dependencies:
   ```bash
   cd [app-name]
   npm install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar zustand @react-native-async-storage/async-storage @expo/vector-icons --legacy-peer-deps
   ```

3. Set up Expo Router in `package.json`:
   ```json
   "main": "expo-router/entry"
   ```

4. Configure `app.json` with the expo-router plugin

5. Start building your app!

### Using Shared Code

To use shared components or utilities:

```typescript
// From an app in apps/[app-name]/
import { theme } from '../../shared/constants/theme';
import { Button } from '../../shared/components/ui/Button';
```

## 📦 Building for Production

When ready to create an APK:

```bash
cd apps/[app-name]
eas build -p android --profile preview
```

## 🎯 Coding Standards

1. Each component in its own file with named export
2. All props typed with TypeScript interfaces
3. Functional components with hooks only
4. Components under 150 lines (extract logic to hooks)
5. All colors/spacing in constants/theme
6. Fully offline-capable features
7. Descriptive variable names (no abbreviations)

## 📖 Component Template

```typescript
import { StyleSheet, View, Text } from 'react-native';

interface ComponentNameProps {
  // props here
}

export function ComponentName({ }: ComponentNameProps) {
  return (
    <View style={styles.container}>
      {/* content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // styles
  },
});
```

## 🤝 Contributing

Each app is independent. Feel free to:
- Add new apps in the `apps/` directory
- Contribute reusable code to `shared/`
- Improve documentation

## 📄 License

MIT
