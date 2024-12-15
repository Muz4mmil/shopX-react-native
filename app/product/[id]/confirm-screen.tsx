import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

export default function ConfirmScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <MaterialIcons name="check-circle" size={175} color="#4CAF50" />
      <Text className="text-4xl font-bold mt-20 mb-8">Order Placed</Text>
      <TouchableOpacity onPress={() => router.push('/')} className='absolute bottom-4 left-0 right-0 bg-black rounded-full mx-4 py-3'>
        <Text className='text-white text-xl font-ibold text-center'>BACK TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
}
