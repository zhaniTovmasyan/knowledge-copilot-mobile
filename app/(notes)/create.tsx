import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

export default function CreateNoteScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Title and content are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/notes", { title, content });
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 px-6 pt-14 bg-background">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-accent text-base">‹ Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-accent px-5 py-2 rounded-xl"
          onPress={handleCreate}
          disabled={loading}
        >
          <Text className="text-background font-bold">
            {loading ? "..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        className="text-2xl font-bold mb-4 text-text-primary border-b border-border pb-4"
        placeholder="Title"
        placeholderTextColor="rgba(255,255,255,0.2)"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="flex-1 text-base text-text-secondary"
        placeholder="Start writing..."
        placeholderTextColor="rgba(255,255,255,0.2)"
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
}
