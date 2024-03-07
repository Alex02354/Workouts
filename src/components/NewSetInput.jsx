import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import { useState } from "react";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";

const mutationDocument = gql`
  mutation myMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "Cluster0"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`;

const NewSetInput = ({ exerciseName }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const { username } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: (newSet) => client.request(mutationDocument, { newSet }),
    onSuccess: () => {
      setReps("");
      setWeight("");
      queryClient.invalidateQueries({ queryKey: ["sets", exerciseName] });
    },
  });

  const addSet = () => {
    const newSet = {
      username: username,
      exercise: exerciseName,
      reps: Number.parseInt(reps),
    };
    if (Number.parseFloat(weight)) {
      newSet.weight = Number.parseFloat(weight);
    }
    mutate(newSet);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          value={reps}
          onChangeText={setReps}
          placeholder="Reps"
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          style={styles.input}
          keyboardType="numeric"
        />

        <Pressable style={styles.button} onPress={addSet}>
          <Text style={{ color: "white" }}>
            {isPending ? "Adding..." : "Add"}
          </Text>
        </Pressable>
      </View>
      {isError && <Text style={{ color: "red" }}>Failed to add the set</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    // flexDirection: 'row',
    gap: 5,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: "gainsboro",
    flex: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "purple",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default NewSetInput;
