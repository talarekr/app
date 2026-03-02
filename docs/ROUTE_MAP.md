# Route Map (web → mobile)

> ⚠️ Unable to directly inspect the remote web branch from this environment (outbound GitHub access returns HTTP 403), so this map is based on the known public information architecture and current API assumptions. It should be verified against the source branch when network access is available.

## `/` (Strona główna)
- **Sekcje UI**:
  - nagłówek marki
  - sekcja hero z CTA do ofert
  - sekcja wyróżnionych ofert
  - stany: loading / pusta lista / błąd
- **Dane**:
  - `GET /api/offers/featured`
- **Nawigacja**:
  - do listy ofert: `/offers`
  - do szczegółów oferty: `/offer/[id]`

## `/offers` (Lista ofert)
- **Sekcje UI**:
  - nagłówek strony ofert
  - pole wyszukiwania tekstowego
  - lista ofert
  - stany: loading / pusta lista / błąd
- **Dane**:
  - `GET /api/offers`
- **Nawigacja**:
  - do szczegółów oferty: `/offer/[id]`
  - powrót na stronę główną: `/`

## `/offer/[id]` (Szczegóły oferty)
- **Sekcje UI**:
  - galeria/zdjęcie główne
  - nazwa, cena, lokalizacja
  - opis
  - lista parametrów (klucz/wartość)
  - CTA powrotu do listy
  - stany: loading / brak danych / błąd
- **Dane**:
  - `GET /api/offers/:id`
- **Nawigacja**:
  - powrót do `/offers`
