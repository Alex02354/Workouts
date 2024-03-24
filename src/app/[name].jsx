import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  Image,
} from "react-native"
import { useLocalSearchParams } from "expo-router"
import exercises from "../../assets/data/exercises.json"
import { Stack } from "expo-router"
import { useState } from "react"
import { gql } from "graphql-request"
import { useQuery } from "@tanstack/react-query"
import client from "../graphqlClient"
import NewSetInput from "../components/NewSetInput"
import SetsList from "../components/SetsList"

const exerciseQuery = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      documents {
        _id
        name
        muscle
        instructions
        equipment
      }
    }
  }
`

export default function ExerciseDetailsScreen() {
  const { name } = useLocalSearchParams()
  const { width } = useWindowDimensions()
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", name],
    queryFn: () => client.request(exerciseQuery, { name }),
  })

  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch data</Text>
  }

  let exercise = null

  if (data && data.exercises && data.exercises.documents) {
    exercise = data.exercises.documents.find((ex) => ex.name === name)
  }

  if (!exercise) {
    return <Text>Exercise not found</Text>
  }

  const getImageSource = (imageName) => {
    switch (imageName) {
      case "EZ-bar spider curl":
        return require("../../assets/EZ-bar spider curl.jpg")
      case "Hammer Curls":
        return require("../../assets/Hammer Curls.jpg")
      case "Incline Hammer Curls":
        return require("../../assets/Incline Hammer Curls.jpg")
      case "Wide-grip barbell curl":
        return require("../../assets/Wide-grip barbell curl.jpg")
      // Add more cases for other image names as needed
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />

      <SetsList
        exerciseName={exercise.name}
        ListHeaderComponent={() => (
          <View style={{ gap: 5 }}>
            <Image
              source={getImageSource(exercise.name)}
              style={{ width: width, height: width }}
            />
            <View style={styles.panel}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>

              <Text style={styles.exerciseSubtitle}>
                <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
                <Text style={styles.subValue}>{exercise.equipment}</Text>
              </Text>
            </View>

            <View style={styles.panel}>
              <Text
                style={styles.instructions}
                numberOfLines={isInstructionExpanded ? 0 : 3}
              >
                {exercise.instructions}
              </Text>
              <Text
                onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
                style={styles.seeMore}
              >
                {isInstructionExpanded ? "See less" : "See more"}
              </Text>
            </View>

            <NewSetInput exerciseName={exercise.name} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "dimgray",
  },
  subValue: {
    textTransform: "capitalize",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  seeMore: {
    alignSelf: "center",
    padding: 5,
    fontWeight: "600",
    color: "gray",
  },
})
