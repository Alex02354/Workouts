import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ExerciseListItem({ item }) {
  const getImageSource = (imageName) => {
    switch (imageName) {
      case "EZ-bar spider curl":
        return require("../../assets/EZ-bar spider curl.jpg");
      case "Hammer Curls":
        return require("../../assets/Hammer Curls.jpg");
      case "Incline Hammer Curls":
        return require("../../assets/Incline Hammer Curls.jpg");
      case "Wide-grip barbell curl":
        return require("../../assets/Wide-grip barbell curl.jpg");
      case "Horeprdec":
        return require("../../assets/Wide-grip barbell curl.jpg");
      case "Lunges":
        return require("../../assets/Wide-grip barbell curl.jpg");
      // Add more cases for other image names as needed
      default:
        return null;
    }
  };
  return (
    <Animated.View entering={FadeInDown.delay(300 * item)}>
      <Link href={`/${item.name}`} asChild>
        <Pressable style={styles.container}>
          <Animated.Image
            source={getImageSource(item.name)}
            style={styles.image}
            sharedTransitionTag={item.name}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textLocation}>
              <Text style={styles.subValue}>{item.muscle}</Text> |{" "}
              <Text style={styles.subValue}>{item.equipment}</Text>
            </Text>
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 4,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  textContainer: {
    margin: 10,
    flexShrink: 1,
    gap: 10,
  },
  textName: {
    color: "#323232",
    fontSize: 20,
    fontWeight: "bold",
  },
  textLocation: {
    color: "#323232",
    fontSize: 15,
  },
});
