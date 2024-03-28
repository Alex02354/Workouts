import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native"
import { Redirect, Stack } from "expo-router"
import { useState } from "react"
import { useAuth } from "../providers/AuthContext"

const AuthScreen = () => {
  const [localUsername, setLocalUsername] = useState("")
  const { setUsername, username } = useAuth()

  const onSignIn = () => {
    setUsername(localUsername)
  }

  if (username) {
    return <Redirect href={"(tabs)"} />
  }

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ title: "Training app", headerShown: false }} />
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/icon.png")} style={styles.logo} />
      </View>
      {/* <Text style={styles.label}>"Welcome to your Workout space!"</Text> */}
      <TextInput
        value={localUsername}
        onChangeText={setLocalUsername}
        placeholder="Username"
        style={styles.input}
      />
      {/*       <Button title="Sign in" onPress={onSignIn}  /> */}
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonTitle}>Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "white",
  },
  label: {
    fontWeight: "600",
    fontSize: 20,
    color: "dimgray",
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "purple",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 290, // Set the desired width
    height: 300, // Set the desired height
    //resizeMode: 'contain', // Adjust the image content mode (cover, contain, etc.)
    // Other styles for your logo
    flex: 0.686,
  },
  imageContainer: {
    flex: 0.72,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
})

export default AuthScreen
