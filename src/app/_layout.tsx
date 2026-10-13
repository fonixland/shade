import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppFocusRefetch } from '../lib/queryLifecycle';

const queryClient = new QueryClient();

export default function RootLayout() {
  useAppFocusRefetch();
  // Session 2.3: GestureDetector only works inside a GestureHandlerRootView.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
