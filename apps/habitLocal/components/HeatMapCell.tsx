import { StyleSheet, View, Text } from 'react-native';
import { colors, borderRadius } from '../constants/theme';

interface HeatMapCellProps {
  completed: number;
  total: number;
  isFuture: boolean;
  isDark: boolean;
  size?: number;
}

export function HeatMapCell({ completed, total, isFuture, isDark, size = 32 }: HeatMapCellProps) {
  const theme = isDark ? colors.dark : colors.light;

  const getBackgroundColor = () => {
    if (isFuture) {
      return theme.heatFuture;
    }
    if (completed === 0) {
      return theme.heatEmpty;
    }
    if (completed === total) {
      return theme.heatFull;
    }
    return theme.heatPartial;
  };

  return (
    <View
      style={[
        styles.cell,
        {
          backgroundColor: getBackgroundColor(),
          width: size,
          height: size,
        },
      ]}
    >
      {isFuture && <Text style={styles.dot}>·</Text>}
    </View>
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
