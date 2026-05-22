import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
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
      router.push("/(auth)/login");
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 px-6 justify-center bg-background">
      <Text className="text-4xl font-bold mb-2 text-text-primary">
        Create account.
      </Text>
      <Text className="text-base text-text-secondary mb-10">
        Start capturing your thoughts
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
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-background text-base font-bold">
          {loading ? "Loading..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text className="text-center text-accent text-sm">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
