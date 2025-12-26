# Shared Code

This directory contains reusable code that can be imported into any app in the `apps/` directory.

## 📁 Structure

```
shared/
├── components/        # Reusable UI components
├── hooks/            # Common React hooks
├── utils/            # Helper functions
└── constants/        # Shared constants and themes
```

## 🔧 Usage

### Importing from Apps

From any app in the `apps/` directory:

```typescript
// Import shared theme
import { colors, spacing, typography } from '../../shared/constants/theme';

// Import shared components
import { Button } from '../../shared/components/Button';

// Import shared hooks
import { useAsyncStorage } from '../../shared/hooks/useAsyncStorage';

// Import shared utilities
import { formatDate, generateId } from '../../shared/utils/helpers';
```

## 📦 Available Resources

### Components
- **Button**: Customizable button with primary/secondary variants

### Hooks
- **useAsyncStorage**: Hook for persisting data with AsyncStorage

### Utilities
- **formatDate**: Format dates consistently
- **generateId**: Generate unique IDs
- **capitalizeFirst**: Capitalize first letter of string
- **debounce**: Debounce function calls

### Constants
- **colors**: App color palette
- **spacing**: Consistent spacing scale
- **typography**: Text styles (h1-h4, body, caption, etc.)
- **borderRadius**: Border radius values
- **shadows**: Shadow presets

## ➕ Adding New Shared Code

When adding code to `shared/`:

1. Ensure it's truly reusable across multiple apps
2. Add proper TypeScript types
3. Document usage in this README
4. Keep it framework-agnostic where possible

## 💡 Example: Using Shared Theme

```typescript
import { StyleSheet, View, Text } from 'react-native';
import { colors, spacing, typography } from '../../shared/constants/theme';

export function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
});
```
