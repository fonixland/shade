import type { Product } from '@/components/ProductCard';
import { useQuery } from '@tanstack/react-query';

const SHADES = ['blonde', 'brown', 'red', 'black'] as const;

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
         console.log('fetching products', new Date().toLocaleTimeString());
      const r = await fetch('https://dummyjson.com/products?limit=200');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data: { products: { id: number; title: string; price: number }[] } = await r.json();
      return data.products.map((p) => ({
        id: String(p.id),
        name: p.title,
        price: p.price,
        shade: SHADES[p.id % SHADES.length],
      }));
    },
    staleTime: 60_000,
  });
}