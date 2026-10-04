import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function Shop() {
  const { data, isPending, isError, error } = useProducts();

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
    <FlatList
      data={data}
      keyExtractor={(p) => p.id}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
});