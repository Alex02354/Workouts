import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated"
import { Redirect, Stack } from "expo-router"
import { useState } from "react"
import { useAuth } from "../providers/AuthContext"

export default function login() {
  const [localUsername, setLocalUsername] = useState("")
  const { setUsername, username } = useAuth()
  const onSignIn = () => {
    setUsername(localUsername)
  }

  if (username) {
    return <Redirect href={"(tabs)"} />
  }

  return (
    <View className="flex-1 flex justify-end">
      <StatusBar />
      <Stack.Screen options={{ title: "Training app", headerShown: false }} />
      <Image
        className="h-full w-full absolute"
        source={require("../../assets/Zinka3.jpg")}
      />
      <LinearGradient
        colors={["transparent", "#18181b"]}
        style={{ width: wp(100), height: hp(70) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="flex items-center"
        >
          <Text
            style={{ fontSize: hp(5) }}
            className="text-white font-bold tracking-wide"
          >
            Best <Text className="text-rose-500">Workouts</Text>
          </Text>
          <Text
            style={{ fontSize: hp(5) }}
            className="text-white font-bold tracking-wide"
          >
            For you
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <TouchableOpacity
            style={{ height: hp(7), width: wp(80) }}
            className="bg-white flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
          >
            <TextInput
              value={localUsername}
              onChangeText={setLocalUsername}
              placeholder="Username"
              style={{ fontSize: hp(3) }}
              className="text-black font-bold"
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <TouchableOpacity
            style={{ height: hp(7), width: wp(80) }}
            className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
            onPress={onSignIn}
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="text-white font-bold tracking-widest"
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  )
}
