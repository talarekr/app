import { Pressable, StyleSheet, Text, View } from 'react-native';

type StateNoticeProps = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function StateNotice({ message, actionLabel, onAction }: StateNoticeProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <Pressable style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  message: {
    color: '#374151',
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
