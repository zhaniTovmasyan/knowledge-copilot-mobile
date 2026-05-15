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
    <View className="flex-1 px-6 justify-center bg-white">
      <Text className="text-3xl font-bold mb-8 text-center text-[#2E3A8C]">
        Sign In
      </Text>
      <TextInput
        className="border border-gray-200 rounded-xl p-4 mb-4 text-base"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="border border-gray-200 rounded-xl p-4 mb-6 text-base"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        className="bg-[#2E3A8C] p-4 rounded-xl items-center mb-4"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-base font-semibold">
          {loading ? "Loading..." : "Sign In"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text className="text-center text-[#2E3A8C] text-sm">
          Dont have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
