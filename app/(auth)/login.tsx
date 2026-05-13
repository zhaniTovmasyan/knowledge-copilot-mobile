import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { router, Href } from 'expo-router'
import api, { setAuthToken } from '../../services/api'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const response = await api.post('/auth/login', { email, password })
      const token = response.data.AuthenticationResult.AccessToken
      setAuthToken(token)
      router.replace('/')
    } catch (error) {
      Alert.alert('Грешка', 'Невалиден email или парола')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 px-6 justify-center bg-white">
      <Text className="text-3xl font-bold mb-8 text-center text-[#2E3A8C]">
        Вход
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
        placeholder="Парола"
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
          {loading ? 'Зареждане...' : 'Вход'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/register' as Href)}>
        <Text className="text-center text-[#2E3A8C] text-sm">
          Нямаш акаунт? Регистрирай се
        </Text>
      </TouchableOpacity>
    </View>
  )
}