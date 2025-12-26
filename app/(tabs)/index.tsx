import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Your App!</Text>
        <Text style={styles.description}>
          Your offline-first mobile app is ready to go.
        </Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Next Steps:</Text>
          <Text style={styles.cardText}>
            • Share your app idea{'\n'}
            • Start building features{'\n'}
            • Test on your Android device via Expo Go
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  cardText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});
