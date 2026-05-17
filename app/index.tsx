import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Href, router, useFocusEffect } from "expo-router";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const { token, clearToken } = useAuthStore();

  useFocusEffect(
    useCallback(() => {
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        fetchNotes();
      }
    }, [token])
  );

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await clearToken();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-400 text-lg">No notes yet</Text>
            <Text className="text-gray-300 text-sm mt-2">
              Tap + to create your first note
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100">
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              {item.title}
            </Text>
            <Text className="text-gray-500 text-sm" numberOfLines={2}>
              {item.content}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        className="absolute bottom-8 right-6 bg-[#2E3A8C] w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push("/(notes)/create" as Href)}
      >
        <Text className="text-white text-3xl font-light">+</Text>
      </TouchableOpacity>
    </View>
  );
}
