import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { gql } from "graphql-request";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import client from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";
import DropDownPicker from "react-native-dropdown-picker";

const mutationDocument2 = gql`
  mutation myMutation($newPlan: NewPlan!) {
    insertPlan(
      document: $newPlan
      dataSource: "Cluster0"
      database: "workouts"
      collection: "plans"
    ) {
      insertedId
    }
  }
`;

const GetDropdowns = gql`
  query dropdowns {
    dropdowns {
      documents {
        _id
        name
      }
    }
  }
`;

const NewPlanInput = () => {
  //exerciseName will not be passed from the planner page screen.
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [exercise, setExercise] = useState(); //exercise will be selected from the dropdown menu
  const { username } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: (newPlan) => client.request(mutationDocument2, { newPlan }),
    onSuccess: () => {
      setReps("");
      setWeight("");
      setExercise("");
      queryClient.invalidateQueries({ queryKey: ["plans", username] });
    },
  });

  const addPlan = () => {
    const newPlan = {
      username: username,
      exercise: exercise,
      reps: Number.parseInt(reps),
    };
    if (Number.parseFloat(weight)) {
      newPlan.weight = Number.parseFloat(weight);
    }

    mutate(newPlan);
  };

  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { label: "Dancing", value: "dancing" },
    { label: "Singing", value: "singing" },
    { label: "Coding", value: "coding" },
    { label: "Swimming", value: "swimming" },
    { label: "Traveling", value: "traveling" },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["dropdowns"],
    queryFn: () => client.request(GetDropdowns),
  });

  const drops = data?.dropdowns.documents;

  return (
    <View style={styles.container}>
      <DropDownPicker
        schema={{ label: "name", value: "name" }}
        items={drops}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={exercise}
        setValue={(val) => setExercise(val)}
        showTickIcon={false}
        placeholder="Select your exercise"
        containerStyle={{
          zIndex: isOpen ? 1000 : 0,
        }}
      />
      <View style={styles.row}>
        <TextInput
          value={reps}
          onChangeText={setReps}
          placeholder="Reps"
          style={styles.input}
          keyboardType="numeric"
          borderColor="black"
        />
        <TextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          style={styles.input}
          keyboardType="numeric"
          borderColor="black"
        />

        <Pressable style={styles.button} onPress={addPlan}>
          <Text style={{ color: "white" }}>
            {isPending ? "Adding..." : "Add"}
          </Text>
        </Pressable>
      </View>
      {isError && (
        <Text style={{ color: "red" }}>Choose exercise and set the reps!</Text>
      )}
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
    zIndex: 1200,
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

export default NewPlanInput;
