import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/components/ProductCard";
import { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Shop() {
  const { data, isPending, isError, error } = useProducts();
  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
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
      data={data}
      keyExtractor={(p) => p.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
});