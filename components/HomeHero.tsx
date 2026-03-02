import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export function HomeHero() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>AutoSzczech</Text>
      <Text style={styles.title}>Samochody z Czech</Text>
      <Text style={styles.subtitle}>Sprawdź aktualne oferty i wybierz auto dopasowane do siebie.</Text>
      <Link href="/offers" style={styles.cta}>
        Zobacz oferty
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 20,
    gap: 10,
  },
  brand: {
    color: '#93c5fd',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
    fontSize: 12,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  subtitle: {
    color: '#d1d5db',
    fontSize: 16,
    lineHeight: 24,
  },
  cta: {
    marginTop: 8,
    backgroundColor: '#fff',
    color: '#111827',
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    overflow: 'hidden',
    fontWeight: '600',
  },
});
