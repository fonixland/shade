import { Link } from "expo-router";
import { memo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export type Product = {
  id: string;
  name: string;
  price: number;
  shade: "blonde" | "brown" | "red" | "black"
};

type Props = {
  product: Product;
  onFavorite?: (id: string) => void;
};

export const ProductCard = memo(function ProductCard({ product, onFavorite }: Props) {
  return (
    <Link href={{ pathname: `/product/[id]`, params: { id: product.id } }} asChild>
      <Pressable style={styles.card} accessibilityRole="button" accessibilityLabel={`${product.name}, $${product.price.toFixed(2)}`}>
        <Text style={styles.name}>{product.name}</Text>
        <Text>${product.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontWeight: "bold",
  },
});
