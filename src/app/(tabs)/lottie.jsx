import { StatusBar } from "expo-status-bar"
import { Pressable, StyleSheet, Text, View } from "react-native"
import LottieView from "lottie-react-native"
import { useEffect, useRef, useState } from "react"

export default function Lottie() {
  const heartRef = useRef(null)
  const giftRef = useRef(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {}, [])

  const handleLike = () => {
    if (liked) {
      heartRef?.current?.reset()
    } else {
      heartRef?.current?.play(30, 144)
    }

    setLiked(!liked)
  }
  const openGift = () => {
    giftRef?.current?.play(1, 240)
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <LottieView
          style={{ flex: 1 }}
          source={require("../../../assets/welcome.json")}
          autoPlay
          loop
        />
      </View>

      <View style={styles.iconRow}>
        <Pressable style={styles.icon} onPress={handleLike}>
          <LottieView
            style={{ flex: 1 }}
            ref={heartRef}
            loop={false}
            source={require("../../../assets/heart.json")}
          />
        </Pressable>
        <Pressable style={styles.icon} onPress={openGift}>
          <LottieView
            style={{ flex: 1 }}
            ref={giftRef}
            loop={false}
            source={require("../../../assets/giftBox.json")}
          />
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 100,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  welcome: {
    height: 300,
    aspectRatio: 1,
  },
  icon: {
    height: 200,
    aspectRatio: 1,
  },
  text: {
    fontSize: 40,
  },
})
