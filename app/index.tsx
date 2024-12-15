import ItemCard from "@/components/ItemCard";
import images from "@/constants/images";
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";

interface Product {
  id: number,
  title: string,
  price: string,
  category: string,
  description: string,
  image: string
}

export default function Index() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products?limit=10")
      const data = await response.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <ScrollView className="bg-white flex-1">
      <Image source={images.HeroImage} className="w-full h-64" resizeMode="cover" />

      <Text className="mt-10 mb-5 text-xl font-isemibold ml-4">Featured Products</Text>

      <View className="flex-row justify-between flex-wrap w-full mt-10">
        {products.map((product, index) => (
          // <ItemCard key={index} product={product} />
          <TouchableOpacity
            key={index}
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
        ))}
      </View>
    </ScrollView>
  );
}
