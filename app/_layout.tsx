import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerBackTitle: 'Wstecz',
          headerTintColor: '#111827',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'AutoSzczech' }} />
        <Stack.Screen name="offers/index" options={{ title: 'Oferty' }} />
        <Stack.Screen name="offer/[id]" options={{ title: 'Szczegóły oferty' }} />
      </Stack>
    </>
  );
}
