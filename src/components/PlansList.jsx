import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { gql } from "graphql-request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";
import PlanListItem from "./PlanListItem";

const plansQuery = gql`
  query plans($username: String!) {
    plans(username: $username) {
      documents {
        _id
        username
        exercise
        reps
        weight
      }
    }
  }
`;

const deletePlanMutation = gql`
  mutation DeletePlan($exercise: String!) {
    deletePlan(
      filter: { exercise: $exercise }
      dataSource: "Cluster0"
      database: "workouts"
      collection: "plans"
    ) {
      deletedCount
    }
  }
`;

const PlansList = () => {
  const { username } = useAuth();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["plans", username],
    queryFn: () => client.request(plansQuery, { username }),
  });

  const { mutate: deletePlan } = useMutation({
    mutationFn: (exercise) => client.request(deletePlanMutation, { exercise }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans", username] });
    },
  });

  const handleDelete = (exercise) => {
    deletePlan(exercise);
  };

  if (error) {
    console.error("Error fetching plans:", error);
    return <Text>Error fetching plans. Please try again later.</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={data.plans.documents}
      showsVerticalScrollIndicator={false}
      style={{ zIndex: 100 }}
      renderItem={({ item }) => (
        <PlanListItem plan={item} onDelete={handleDelete} />
      )}
    />
  );
};

export default PlansList;
