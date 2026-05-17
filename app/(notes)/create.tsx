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
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api.post("/notes", { title, content });
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 px-6 pt-6 bg-white">
      <TextInput
        className="text-2xl font-bold mb-4 text-gray-800"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="flex-1 text-base text-gray-600"
        placeholder="Start writing..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity
        className="bg-[#2E3A8C] p-4 rounded-xl items-center mb-8"
        onPress={handleCreate}
        disabled={loading}
      >
        <Text className="text-white text-base font-semibold">
          {loading ? "Saving..." : "Save Note"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
