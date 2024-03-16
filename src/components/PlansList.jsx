import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
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

const PlansList = () => {
  const { username } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["plans", username],
    queryFn: () => client.request(plansQuery, { username }),
  });
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
      renderItem={({ item }) => <PlanListItem plan={item} />}
    />
  );
};

export default PlansList;
