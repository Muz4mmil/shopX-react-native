import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'

interface Product {
  id: number,
  title: string,
  price: string,
  category: string,
  description: string,
  image: string
}

const ItemCard = ({ product }: { product: Product }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='w-[48%] px-4 mb-20'
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image source={{ uri: product.image }} className="w-full h-56 mb-4" resizeMode="contain" />
      <Text className="text-lg font-isemibold" numberOfLines={2}>{product.title}</Text>
      <View className="flex-row justify-between items-end mt-3">
        <Text className="text-2xl font-isemibold w-28">${product.price}</Text>
        <View className="flex-row gap-2">
          <FontAwesome name="star" size={18} color="#eab308" />
          <Text className="font-isemibold text-yellow-500">4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ItemCard