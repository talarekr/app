# AutoSzczech Mobile (iOS only)

Natywna aplikacja iOS zbudowana w Expo + Expo Router.

## Zakres tej iteracji

- trasy i ekran nawigacyjne:
  - `/` — strona główna
  - `/offers` — lista ofert
  - `/offer/[id]` — szczegóły oferty
- ekrany odwzorowane jako natywne komponenty React Native (`View`, `Text`, `Image`, `ScrollView`, `TextInput`, `Pressable/Link`)
- obsługa stanów `loading`, `error`, `empty` dla głównych flow
- współdzielone komponenty UI dla spójności widoków

## Uruchomienie (tylko iOS)

1. Zainstaluj zależności:

   ```bash
   npm install
   ```

2. Uruchom Expo:

   ```bash
   npx expo start
   ```

3. Otwórz aplikację na iOS:
   - w terminalu naciśnij `i` (iOS Simulator), albo
   - zeskanuj kod QR aplikacją Expo Go na iPhonie.

## API

Domyślny backend:

- `https://autoszczech.pl`

Możesz nadpisać URL backendu przez:

- `EXPO_PUBLIC_API_BASE_URL`

Używane endpointy w tej iteracji:

- `GET /api/offers/featured`
- `GET /api/offers`
- `GET /api/offers/:id`

## iOS-only

Konfiguracja aplikacji jest ograniczona do iOS (bez konfiguracji Android). Zobacz `app.json`.
