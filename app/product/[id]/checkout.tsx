import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';

interface Product {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}

const Checkout = () => {
  const { id } = useLocalSearchParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedPayment, setSelectedPayment] = useState('card')

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'upi', name: 'UPI', icon: 'account-balance' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'local-atm' },
    { id: 'netBanking', name: 'Net Banking', icon: 'money' },
    { id: 'emi', name: 'EMI', icon: 'calendar-month' },
  ]

  const TAX_RATE = 0.18
  const DELIVERY_FEE = 5.99
  const DISCOUNT = 10
  const COUPON_DISCOUNT = 5

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  const calculateTotal = () => {
    if (!product) return 0
    const subtotal = parseFloat(product.price)
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax + DELIVERY_FEE - DISCOUNT - COUPON_DISCOUNT
    return total.toFixed(2)
  }

  return (
    product ?
      <View className='bg-white flex-1 relative'>
        <ScrollView className="flex-1 p-4">
          <Text className="text-2xl text-center font-bold mb-5">Checkout</Text>

          <View className="bg-gray-50 p-4 rounded-lg mb-10">
            <Text className="text-lg font-bold mb-3">Order Summary</Text>
            <View className="flex-row justify-between mb-2">
              <Text>Subtotal</Text>
              <Text>${product.price}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text>Tax (18%)</Text>
              <Text>${(parseFloat(product.price) * TAX_RATE).toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text>Delivery Fee</Text>
              <Text>${DELIVERY_FEE}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text>Discount</Text>
              <Text>-${DISCOUNT}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text>Coupon Applied (SUMMER5)</Text>
              <Text>-${COUPON_DISCOUNT}</Text>
            </View>
            <View className="flex-row justify-between pt-2 mt-2 border-t border-gray-200">
              <Text className="font-bold text-base">Total</Text>
              <Text className="font-bold text-base">${calculateTotal()}</Text>
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-lg font-bold mb-3">Payment Method</Text>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`flex-row items-center p-4 border rounded-lg mb-2 ${selectedPayment === method.id
                  ? 'border-gray-500 bg-gray-50'
                  : 'border-gray-200'
                  }`}
                onPress={() => setSelectedPayment(method.id)}
              >
                <MaterialIcons name={method.icon as any} size={24} color="black" />
                <Text className="ml-3 text-base">{method.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
        <TouchableOpacity onPress={() => router.push(`/product/${id}/confirm-screen`)} className='absolute bottom-4 left-0 right-0 bg-black rounded-full mx-4 py-3'>
          <Text className='text-white text-xl font-ibold text-center'>CONFIRM</Text>
        </TouchableOpacity>
      </View> :
      <View className='flex-1 justify-center bg-white'>
        <ActivityIndicator size={50} />
      </View>
  )
}

export default Checkout
