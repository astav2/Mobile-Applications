import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useDarkMode } from '../hooks/useDarkMode';
import { colors, spacing, fontSize } from '../constants/theme';

export default function NotFoundScreen() {
  const darkMode = useDarkMode();
  const theme = darkMode ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Screen not found</Text>
      <Link href="/" style={[styles.link, { color: theme.primary }]}>
        Go back home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  link: {
    fontSize: fontSize.md,
    textDecorationLine: 'underline',
  },
});
