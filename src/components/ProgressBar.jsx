import React, { useRef, useEffect } from "react"
import { View, Text, Dimensions, Animated } from "react-native"

const ProgressBar = ({ perc }) => {
  const screenWidth = Dimensions.get("screen").width
  const progressWidth = screenWidth * perc

  const animatedWidth = useRef(new Animated.Value(progressWidth)).current

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progressWidth,
      duration: 500, // Adjust duration as needed
      useNativeDriver: false, // Make sure to set this to false
    }).start()
  }, [progressWidth])

  const clampedWidth = animatedWidth.interpolate({
    inputRange: [0, screenWidth],
    outputRange: [0, screenWidth],
    extrapolate: "clamp",
  })

  return (
    <View
      style={{
        backgroundColor: "gainsboro",
        borderRadius: 99,
        marginTop: 10,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          height: 12,
          backgroundColor: "purple",
          borderRadius: 99,
          width: clampedWidth,
        }}
      ></Animated.View>
    </View>
  )
}

export default ProgressBar
