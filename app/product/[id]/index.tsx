import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'

interface Product {
  id: number,
  title: string,
  price: string,
  category: string,
  description: string,
  image: string
}

const ProductPage = () => {
  const { id } = useLocalSearchParams()
  const [product, setProduct] = useState<Product | null>(null)

  const sizes = ['S', 'M', 'L', 'XL']
  const colors = ['red', 'purple', 'green']

  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await response.json()
      setProduct(data)
    }

    fetchProduct()
  }, [id])

  return (
    product ?
      <View className='bg-white flex-1 relative'>
        <ScrollView className='bg-white flex-1 h-full mb-20'>
          <Text className='text-[175px] w-[700px] italic text-gray-100 font-black rotate-90 absolute top-64 -left-44'>SHOPX</Text>
          <Image source={{ uri: product.image }} className="w-full aspect-square" resizeMode="contain" />
          <Text className="text-6xl font-iblack px-4 mt-6 text-neutral-700">${product.price}</Text>
          <Text className="text-2xl font-isemibold mt-5 px-4" numberOfLines={2}>{product.title}</Text>

          <View className="flex-row px-4 mt-10 gap-20">
            <View className=''>
              <Text className='text-lg font-isemibold'>Select your size</Text>
              <View className='flex-row gap-2 mt-3'>
                {sizes.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedSize(size)}
                    className={`border ${selectedSize === size ? 'border-gray-800' : ' border-gray-200'} rounded-xl w-10 h-10 flex items-center justify-center`}
                  >
                    <Text className='text-xl text-gray-700 font-isemibold'>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className=''>
              <Text className='text-lg font-isemibold'>Colors</Text>
              <View className='flex-row gap-3 mt-3'>
                <View className={`border border-gray-700 rounded-full w-8 h-8 bg-red-500`}></View>
                <View className={`border border-gray-700 rounded-full w-8 h-8 bg-purple-500`}></View>
                <View className={`border border-gray-700 rounded-full w-8 h-8 bg-green-500`}></View>
              </View>
            </View>
          </View>

          <View className='px-4 my-10'>
            <Text className='text-lg font-isemibold'>Description</Text>
            <Text className='text-lg mt-3'>{product.description}</Text>
          </View>
        </ScrollView>

        <TouchableOpacity onPress={() => router.push(`/product/${id}/checkout`)} className='absolute bottom-4 left-0 right-0 bg-black mx-4 rounded-full py-3'>
          <Text className='text-white text-xl font-ibold text-center'>BUY NOW</Text>
        </TouchableOpacity>
      </View> :
      <View className='flex-1 justify-center bg-white'>
        <ActivityIndicator size={50} />
      </View>
  )
}

export default ProductPage