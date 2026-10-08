import { Link } from "expo-router";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type Product = {
  id: string;
  name: string;
  price: number;
  shade: "blonde" | "brown" | "red" | "black"
};

type Props = {
  product: Product;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
};

export const ProductCard = memo(function ProductCard({ product, isFavorite = false, onFavorite }: Props) {
  console.log("render ProductCard", product.id);
  return (
    <Link href={{ pathname: `/product/[id]`, params: { id: product.id } }} asChild>
      <Pressable style={styles.card} accessibilityRole="button" accessibilityLabel={`${product.name}, $${product.price.toFixed(2)}`}>
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text>${product.price.toFixed(2)}</Text>
        </View>
        <Pressable
          onPress={() => onFavorite?.(product.id)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Text style={styles.heart}>{isFavorite ? "♥" : "♡"}</Text>
        </Pressable>
      </Pressable>
    </Link>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  heart: {
    fontSize: 22,
  },
});
