import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { router, useFocusEffect } from "expo-router";
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
    <View className="flex-1 bg-background">
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 60 }}
        ListHeaderComponent={
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-3xl font-bold text-text-primary">Notes</Text>
            {loading && <ActivityIndicator color="#00e5c8" />}

            <TouchableOpacity
              className="bg-card px-4 py-2 rounded-xl"
              onPress={handleLogout}
            >
              <Text className="text-text-secondary text-sm font-semibold">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-24">
            <Text className="text-text-secondary text-lg mb-2">
              No notes yet
            </Text>
            <Text className="text-text-muted text-sm">
              Tap + to create your first note
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-card rounded-2xl p-4 mb-3 border border-border">
            <Text className="text-text-primary text-base font-semibold mb-1">
              {item.title}
            </Text>
            <Text className="text-text-secondary text-sm" numberOfLines={2}>
              {item.content}
            </Text>
            <Text className="text-text-muted text-xs mt-2">
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        className="absolute bottom-8 right-6 bg-accent w-14 h-14 rounded-full items-center justify-center"
        style={{
          shadowColor: "#00e5c8",
          shadowOpacity: 0.4,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
        }}
        onPress={() => router.push("/(notes)/create")}
      >
        <Text className="text-background text-3xl font-light">+</Text>
      </TouchableOpacity>
    </View>
  );
}
