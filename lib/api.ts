export type Offer = {
  id: string;
  title: string;
  price: string;
  city?: string;
  imageUrl?: string;
  mileage?: string;
  fuel?: string;
  year?: string;
};

export type OfferDetails = Offer & {
  description?: string;
  gallery?: string[];
  specs?: Record<string, string>;
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://autoszczech.pl';

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${path}`);
  }

  return (await response.json()) as T;
}

export async function fetchFeaturedOffers(): Promise<Offer[]> {
  return fetchJson<Offer[]>('/api/offers/featured');
}

export async function fetchOffers(): Promise<Offer[]> {
  return fetchJson<Offer[]>('/api/offers');
}

export async function fetchOfferDetails(id: string): Promise<OfferDetails> {
  return fetchJson<OfferDetails>(`/api/offers/${id}`);
}
