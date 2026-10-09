import { Link } from "expo-router";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

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

  // Session 2.3: a shared value is NOT state -- writing it never re-renders.
  // The useAnimatedStyle arrow is a worklet; it runs on the UI thread.
  const scale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Link href={{ pathname: `/product/[id]`, params: { id: product.id } }} asChild>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.95))}
        onPressOut={() => (scale.value = withSpring(1))}
        accessibilityRole="button"
        accessibilityLabel={`${product.name}, $${product.price.toFixed(2)}`}
      >
        <Animated.View style={[styles.card, pressStyle]}>
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
        </Animated.View>
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
    backgroundColor: "white",
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
