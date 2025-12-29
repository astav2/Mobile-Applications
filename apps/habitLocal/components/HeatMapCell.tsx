import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors, borderRadius } from '../constants/theme';

interface HeatMapCellProps {
  completed: number;
  total: number;
  isFuture: boolean;
  isDark: boolean;
  date: string;
  onPress?: (date: string) => void;
  size?: number;
}

export function HeatMapCell({ completed, total, isFuture, isDark, date, onPress, size = 32 }: HeatMapCellProps) {
  const theme = isDark ? colors.dark : colors.light;

  const getBackgroundColor = () => {
    if (isFuture) {
      return theme.heatFuture;
    }

    if (total === 0 || completed === 0) {
      return theme.heatEmpty;
    }

    const percentage = (completed / total) * 100;

    if (percentage <= 25) {
      return theme.heatLow;
    } else if (percentage <= 50) {
      return theme.heatMedium;
    } else if (percentage <= 75) {
      return theme.heatMediumHigh;
    } else {
      return theme.heatHigh;
    }
  };

  const handlePress = () => {
    if (onPress && !isFuture) {
      onPress(date);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          backgroundColor: getBackgroundColor(),
          width: size,
          height: size,
        },
      ]}
      onPress={handlePress}
      disabled={isFuture}
      activeOpacity={0.7}
    >
      {isFuture && <Text style={styles.dot}>·</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    fontSize: 20,
    color: '#999',
  },
});
