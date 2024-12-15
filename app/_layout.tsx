import { Stack, SplashScreen } from "expo-router";
import { Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_900Black, useFonts } from '@expo-google-fonts/inter'
import { useEffect } from "react";
import "./global.css";
import { View, Text } from "react-native";
import Feather from '@expo/vector-icons/Feather';

SplashScreen.preventAutoHideAsync()


const HeaderText = () => {
  return (
    <View className="flex-row py-4">
      <Text className="text-[28px] font-iblack">SHOP</Text>
      <Text className="text-[28px] font-iblack text-green-600">X</Text>
    </View>
  )
}

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTitle: prop => <HeaderText />,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter_900Black",
            fontSize: 26,
          },
          headerLeft: () => <Feather name="menu" size={28} color="black" />,
          headerRight: () => <Feather name="shopping-cart" size={28} color="black" />,
        }}
      />

      <Stack.Screen
        name="product/[id]/index"
        options={{
          headerShadowVisible: false,
          headerRight: () => <Feather name="bookmark" size={24} color="black" />,
          headerTitle: ''
        }}
      />
      <Stack.Screen
        name="product/[id]/checkout"
        options={{
          headerShadowVisible: false,
          headerTitle: prop => <HeaderText />,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter_900Black",
            fontSize: 26,
          },
        }}
      />
      <Stack.Screen
        name="product/[id]/confirm-screen"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
