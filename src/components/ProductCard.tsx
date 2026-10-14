import { Link } from "expo-router";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

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

// Swipe right past this many points to toggle favorite.
const SWIPE_THRESHOLD = 80;

export const ProductCard = memo(function ProductCard({ product, isFavorite = false, onFavorite }: Props) {
  console.log("render ProductCard", product.id);

  // Session 2.3: a shared value is NOT state -- writing it never re-renders.
  // The useAnimatedStyle arrow is a worklet; it runs on the UI thread.
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const toggleFavorite = () => onFavorite?.(product.id);

  // Session 2.3 Full: swipe-to-favorite. The pan callbacks are worklets (UI thread),
  // so the card tracks the finger even while the JS thread is blocked.
  // activeOffsetX: only claim horizontal drags, so vertical list scrolling still works.
  const pan = Gesture.Pan()
    .activeOffsetX([-15, 15])
    .failOffsetY([-10, 10])
    .onUpdate((e) => {
      translateX.value = Math.max(0, e.translationX);
    })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        scheduleOnRN(toggleFavorite); // hop back to JS for the React state change
      }
      translateX.value = withSpring(0);
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, cardStyle]}>
        <Link href={{ pathname: `/product/[id]`, params: { id: product.id } }} asChild>
          <Pressable
            style={styles.info}
            onPressIn={() => (scale.value = withSpring(0.95))}
            onPressOut={() => (scale.value = withSpring(1))}
            accessibilityRole="button"
            accessibilityLabel={`${product.name}, $${product.price.toFixed(2)}`}
            // Session 2.4: the swipe is invisible to VoiceOver, so expose it as a
            // custom action (VoiceOver: swipe up/down on the card, double-tap).
            accessibilityActions={[
              { name: "toggleFavorite", label: isFavorite ? "Remove from favorites" : "Add to favorites" },
            ]}
            onAccessibilityAction={(e) => {
              if (e.nativeEvent.actionName === "toggleFavorite") toggleFavorite();
            }}
          >
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text>${product.price.toFixed(2)}</Text>
            </View>
          </Pressable>
        </Link>
        <Pressable
          onPress={toggleFavorite}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Text style={styles.heart}>{isFavorite ? "♥" : "♡"}</Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
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
