import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router, Href } from "expo-router";
import api from "../../services/api";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await api.post("/auth/register", { email, password });
      Alert.alert("Success!", "Check your email to confirm your account");
      router.push("/(auth)/login" as Href);
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 px-6 justify-center bg-white">
      <Text className="text-3xl font-bold mb-8 text-center text-[#2E3A8C]">
        Sign Up
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
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-white text-base font-semibold">
          {loading ? "Loading..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/login" as Href)}>
        <Text className="text-center text-[#2E3A8C] text-sm">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
