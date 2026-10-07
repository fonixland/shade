import type { Product } from "@/components/ProductCard";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Shop() {
  const { data, isPending, isError, error } = useProducts();
  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    []
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
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
});