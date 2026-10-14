import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Account() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 16 }}>
      <Text>Account</Text>
      <Link href="/checkout" style={{ color: "#208AEF", fontSize: 16 }}>
        Go to checkout
      </Link>
    </View>
  );
}
