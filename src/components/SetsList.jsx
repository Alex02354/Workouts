import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import client from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";
import SetListItem from "./SetListItem";

const setsQuery = gql`
  query sets($exercise: String!, $username: String!) {
    sets(exercise: $exercise, username: $username) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
  const { username } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["sets", exerciseName],
    queryFn: () =>
      client.request(setsQuery, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={data.sets.documents}
      ListHeaderComponent={() => (
        <>
          <ListHeaderComponent />
        </>
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <SetListItem set={item} />}
    />
  );
};

export default SetsList;
