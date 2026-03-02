import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';

import { OfferCard } from '@/components/offers/OfferCard';
import { ScreenContainer } from '@/components/ScreenContainer';
import { StateNotice } from '@/components/StateNotice';
import { fetchOffers, type Offer } from '@/lib/api';

export default function OffersScreen() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOffers();
      setOffers(data);
    } catch {
      setError('Nie udało się pobrać listy ofert.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredOffers = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) {
      return offers;
    }

    return offers.filter((offer) => {
      const haystack = `${offer.title} ${offer.city ?? ''} ${offer.price}`.toLowerCase();
      return haystack.includes(text);
    });
  }, [offers, query]);

  return (
    <ScreenContainer>
      <View style={styles.head}>
        <Text style={styles.title}>Oferty samochodów</Text>
        <Text style={styles.subtitle}>Przeglądaj i filtruj dostępne ogłoszenia.</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Szukaj po nazwie, mieście lub cenie"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator color="#111827" />
      ) : error ? (
        <StateNotice message={error} actionLabel="Spróbuj ponownie" onAction={loadData} />
      ) : filteredOffers.length === 0 ? (
        <StateNotice message="Brak ofert spełniających kryteria." />
      ) : (
        <View style={styles.list}>
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  head: { gap: 4 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  subtitle: { color: '#4b5563', fontSize: 15 },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  list: { gap: 10 },
});
