import type { Product } from "@/components/ProductCard";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

const toggled = (prev: Set<string>, id: string) => {
  const next = new Set(prev);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
};

// Session 2.3 Done-when: the Day 1 heavy button. Freezes the JS thread for a
// second or two. Press-hold a card and tap this: the Reanimated spring keeps
// running, because its worklet lives on the UI thread, not the JS thread.
const blockJsThread = () => {
  let n = 0;
  for (let i = 0; i < 50_000_000; i++) n += i;
  console.log("heavy JS done", n);
};

const HeavyButton = () => (
  <Pressable onPress={blockJsThread} style={styles.heavy}>
    <Text style={styles.heavyText}>Block the JS thread (50M loop)</Text>
  </Pressable>
);

export default function Shop() {
  const { data, isPending, isError, error } = useProducts();
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  // Step 3 "after": one stable callback; only the tapped row's isFavorite changes,
  // so memo skips every other ProductCard.
  const toggleFavorite = useCallback(
    (id: string) => setFavorites((prev) => toggled(prev, id)),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} isFavorite={favorites.has(item.id)} onFavorite={toggleFavorite} />
    ),
    [favorites, toggleFavorite]
  );

  // Session 2.2 Full: 1,000 local rows so we measure the list, not the network
  const bigList = useMemo<Product[]>(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        id: String(i),
        name: `Shade ${i}`,
        price: 19.99 + (i % 20),
        shade: (["blonde", "brown", "red", "black"] as const)[i % 4],
      })),
    []
  );

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Couldn't load products: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={bigList}
      keyExtractor={(p) => p.id}
      renderItem={renderItem}
      ListHeaderComponent={HeavyButton}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  heavy: { margin: 12, padding: 14, borderRadius: 10, backgroundColor: "#b00020", alignItems: "center" },
  heavyText: { color: "white", fontWeight: "600" },
});
