import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  isDark: boolean;
}

export function AddHabitModal({ visible, onClose, onAdd, isDark }: AddHabitModalProps) {
  const [habitName, setHabitName] = useState('');
  const theme = isDark ? colors.dark : colors.light;

  const handleAdd = () => {
    if (habitName.trim()) {
      onAdd(habitName);
      setHabitName('');
      onClose();
    }
  };

  const handleClose = () => {
    setHabitName('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />

        <View style={[styles.modal, { backgroundColor: theme.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>New Habit</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Enter habit name..."
            placeholderTextColor={theme.textSecondary}
            value={habitName}
            onChangeText={setHabitName}
            autoFocus={true}
            onSubmitEditing={handleAdd}
          />

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: habitName.trim() ? theme.primary : theme.border,
              },
            ]}
            onPress={handleAdd}
            disabled={!habitName.trim()}
          >
            <Text
              style={[
                styles.buttonText,
                { color: habitName.trim() ? '#FFFFFF' : theme.textSecondary },
              ]}
            >
              Add Habit
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '85%',
    maxWidth: 400,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    marginBottom: spacing.lg,
  },
  button: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
