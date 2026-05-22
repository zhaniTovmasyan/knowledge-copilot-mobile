import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuthStore();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.AuthenticationResult.AccessToken;
      await setToken(token);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 px-6 justify-center bg-background">
      <Text className="text-4xl font-bold mb-2 text-text-primary">
        Welcome back.
      </Text>
      <Text className="text-base text-text-secondary mb-10">
        Sign in to your notes
      </Text>

      <TextInput
        className="bg-surface border border-border rounded-2xl p-4 mb-3 text-base text-text-primary"
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.25)"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="bg-surface border border-border rounded-2xl p-4 mb-6 text-base text-text-primary"
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.25)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-accent p-4 rounded-2xl items-center mb-4"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-background text-base font-bold">
          {loading ? "Loading..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text className="text-center text-accent text-sm">
          Don&apos;t have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
