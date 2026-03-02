import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { HomeHero } from '@/components/HomeHero';
import { OfferCard } from '@/components/offers/OfferCard';
import { ScreenContainer } from '@/components/ScreenContainer';
import { StateNotice } from '@/components/StateNotice';
import { fetchFeaturedOffers, type Offer } from '@/lib/api';

export default function HomeScreen() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchFeaturedOffers();
      setOffers(data);
    } catch {
      setError('Nie udało się pobrać wyróżnionych ofert.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ScreenContainer>
      <HomeHero />

      <View style={styles.section}>
        <Text style={styles.heading}>Wyróżnione oferty</Text>

        {loading ? (
          <ActivityIndicator color="#111827" />
        ) : error ? (
          <StateNotice message={error} actionLabel="Spróbuj ponownie" onAction={loadData} />
        ) : offers.length === 0 ? (
          <StateNotice message="Brak wyróżnionych ofert." />
        ) : (
          <View style={styles.list}>
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  heading: {
    fontSize: 22,
    color: '#111827',
    fontWeight: '700',
  },
  list: {
    gap: 10,
  },
});
