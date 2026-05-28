import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

interface Note {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  createdAt: string;
}

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    if (token && id) {
      fetchNote();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const fetchNote = async () => {
    try {
      const response = await api.get(`/notes/${id}`);
      setNote(response.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color="#00e5c8" size="large" />
      </View>
    );
  }

  if (!note) return null;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 24, paddingTop: 60 }}
    >
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Text className="text-accent text-base">‹ Notes</Text>
      </TouchableOpacity>

      <Text className="text-text-muted text-xs mb-2">
        {new Date(note.createdAt).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>

      <Text className="text-text-primary text-3xl font-bold mb-6">
        {note.title}
      </Text>

      <Text className="text-text-secondary text-base leading-7 mb-8">
        {note.content}
      </Text>

      {note.summary && (
        <View className="border-t border-border pt-6">
          <Text className="text-accent text-xs font-bold uppercase tracking-widest mb-3">
            ✦ AI Summary
          </Text>
          <View className="bg-surface rounded-2xl p-4 border-l-2 border-accent">
            <Text className="text-text-secondary text-sm leading-6">
              {note.summary}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
