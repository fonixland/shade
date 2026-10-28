import { useCallback, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Biometrics from "../../../modules/shade-biometrics";

type Gate = "checking" | "unlocked" | "locked" | "unavailable";

export default function Account() {
  const [gate, setGate] = useState<Gate>("checking");

  const unlock = useCallback(() => {
    if (!Biometrics.isAvailable()) {
      setGate("unavailable"); // no hardware, or Face ID not enrolled
      return;
    }
    setGate("checking");
    Biometrics.authenticate("Unlock your account")
      .then((ok) => setGate(ok ? "unlocked" : "locked"))
      .catch(() => setGate("locked")); // user cancelled or face didn't match
  }, []);

  useFocusEffect(
    useCallback(() => {
      unlock();
      return () => setGate("checking"); // re-lock when you leave the tab
    }, [unlock])
  );

  if (gate !== "unlocked") {
    const message = {
      checking: "Checking Face ID…",
      locked: "Account locked",
      unavailable: "Face ID isn't available on this device",
    }[gate];
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 16 }}>
        <Text>{message}</Text>
        {gate === "locked" && (
          <Pressable onPress={unlock} accessibilityRole="button">
            <Text style={{ color: "#208AEF", fontSize: 16 }}>Try again</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 16 }}>
      <Text>Account</Text>
      <Link href="/checkout" style={{ color: "#208AEF", fontSize: 16 }}>
        Go to checkout
      </Link>
    </View>
  );
}
