import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

import type { Offer } from '@/lib/api';

type OfferCardProps = {
  offer: Offer;
};

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Link href={{ pathname: '/offer/[id]', params: { id: offer.id } }} style={styles.link}>
      <View style={styles.row}>
        <View style={styles.imageWrap}>
          {offer.imageUrl ? (
            <Image source={{ uri: offer.imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.imageFallback}>
              <Text style={styles.imageFallbackText}>Brak zdjęcia</Text>
            </View>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>{offer.title}</Text>
          <Text style={styles.price}>{offer.price}</Text>
          {!!offer.city && <Text style={styles.meta}>{offer.city}</Text>}
          <Text style={styles.meta}>Rok: {offer.year ?? '—'} • Przebieg: {offer.mileage ?? '—'}</Text>
          {!!offer.fuel && <Text style={styles.meta}>Paliwo: {offer.fuel}</Text>}
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  imageWrap: {
    width: 96,
    height: 96,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackText: {
    color: '#6b7280',
    fontSize: 12,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  price: {
    fontSize: 17,
    color: '#1d4ed8',
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    color: '#4b5563',
    fontSize: 13,
  },
});
