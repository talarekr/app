import { Link, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';
import { StateNotice } from '@/components/StateNotice';
import { fetchOfferDetails, type OfferDetails } from '@/lib/api';

export default function OfferDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [offer, setOffer] = useState<OfferDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      setError('Brak identyfikatora oferty.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchOfferDetails(String(id));
      setOffer(data);
    } catch {
      setError('Nie udało się pobrać szczegółów oferty.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const heroImage = useMemo(() => offer?.gallery?.[0] ?? offer?.imageUrl, [offer]);

  return (
    <ScreenContainer>
      {loading ? (
        <ActivityIndicator color="#111827" />
      ) : error ? (
        <StateNotice message={error} actionLabel="Spróbuj ponownie" onAction={loadData} />
      ) : !offer ? (
        <StateNotice message="Nie znaleziono oferty." />
      ) : (
        <>
          <View style={styles.card}>
            {heroImage ? (
              <Image source={{ uri: heroImage }} style={styles.image} />
            ) : (
              <View style={styles.imageFallback}>
                <Text style={styles.imageFallbackText}>Brak zdjęcia</Text>
              </View>
            )}

            <Text style={styles.title}>{offer.title}</Text>
            <Text style={styles.price}>{offer.price}</Text>
            {!!offer.city && <Text style={styles.meta}>Lokalizacja: {offer.city}</Text>}
            {!!offer.year && <Text style={styles.meta}>Rok produkcji: {offer.year}</Text>}
            {!!offer.mileage && <Text style={styles.meta}>Przebieg: {offer.mileage}</Text>}
            {!!offer.fuel && <Text style={styles.meta}>Paliwo: {offer.fuel}</Text>}
          </View>

          {offer.description ? (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Opis</Text>
              <Text style={styles.description}>{offer.description}</Text>
            </View>
          ) : null}

          {offer.specs ? (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Parametry</Text>
              {Object.entries(offer.specs).map(([key, value]) => (
                <View key={key} style={styles.specRow}>
                  <Text style={styles.specKey}>{key}</Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <Link href="/offers" style={styles.backLink}>
            Wróć do listy ofert
          </Link>
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  imageFallback: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackText: {
    color: '#6b7280',
  },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  price: { fontSize: 22, fontWeight: '700', color: '#1d4ed8' },
  meta: { fontSize: 15, color: '#374151' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  description: { color: '#374151', lineHeight: 22 },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingVertical: 6,
    gap: 8,
  },
  specKey: { color: '#6b7280', flex: 1 },
  specValue: { color: '#111827', flex: 1, textAlign: 'right', fontWeight: '600' },
  backLink: {
    backgroundColor: '#111827',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
