import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import "../global.css";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const { isAuthenticated, loadToken } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadToken().then(() => setIsReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isReady, isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(notes)/create" />
    </Stack>
  );
}
