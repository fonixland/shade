   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useAppFocusRefetch } from '../lib/queryLifecycle';

   const queryClient = new QueryClient();

   export default function RootLayout() {
     useAppFocusRefetch();

     return (
       <QueryClientProvider client={queryClient}>
         <Stack>
           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
           <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
         </Stack>
       </QueryClientProvider>
     );
   }