import { StatusBar } from "expo-status-bar"
import React from "react"
import { Animated, StyleSheet, Text, View } from "react-native"

const Progress = ({ step, steps, height }) => {
  const [width, setWidth] = React.useState(0)
  const animatedValue = React.useRef(new Animated.Value(-1000)).current
  const reactive = React.useRef(new Animated.Value(-1000)).current

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps)
  }, [step, width])

  return (
    <>
      <Text style={{ marginBottom: 8 }}>
        {step}/{steps}
      </Text>
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width
          setWidth(newWidth)
        }}
        style={{
          height,
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: height,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height,
            backgroundColor: "purple",
            borderRadius: height,
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            transform: [{ translateX: animatedValue }],
          }}
        />
      </View>
    </>
  )
}

export default function App() {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (10 + 1))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [index])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Progress step={index} steps={10} height={20} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
})
