import React from "react";
import { View, StyleSheet, Text, ActivityIndicator, Alert } from "react-native";
import { Agenda } from "react-native-calendars";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import client from "../../graphqlClient";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../providers/AuthContext";

const GetEvents = gql`
  query Event($exercise: String) {
    Event(exercise: $exercise) {
      documents {
        _id
        exercise
        reps
        username
        weight
      }
    }
  }
`;

const getEventsSchedule = (events) => {
  const items = {};

  events.forEach((event) => {
    const date = new Date(parseInt(event._id.substring(0, 8), 16) * 1000);
    const day = date.toISOString().slice(0, 10); // Format date to YYYY-MM-DD
    if (!items[day]) {
      items[day] = [];
    }
    items[day].push({ ...event, day, height: 50 });
  });

  return items;
};

const Calendar = () => {
  const { exercise } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["Event", exercise],
    queryFn: () => client.request(GetEvents, { exercise }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert("Error fetching events", error.message);
    return null;
  }

  const events = getEventsSchedule(data?.Event.documents || []);
  
  return (
    <View style={styles.container}>
      <Agenda
        items={events}
        showOnlySelectedDayItems
        renderItem={(item) => (
          <View style={styles.item}>
            <Text style={{ fontWeight: "bold" }}>{item.exercise}</Text>
            <Text>
              <Text>Reps: {item.reps}</Text> |{" "}
              <Text>Weight: {item.weight}</Text>{" "}
            </Text>
          </View>
        )}
        renderEmptyData={() => {
          return (
            <View>
              <Text>rest day</Text>
            </View>
          );
        }}
        theme={{
          agendaDayTextColor: "purple",
          agendaDayNumColor: "purple",
          agendaTodayColor: "purple",
          agendaKnobColor: "purple",
          selectedDayBackgroundColor: "purple",
          dotColor: "purple",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Calendar;
