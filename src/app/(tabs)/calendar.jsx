import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Agenda } from "react-native-calendars";

const calendar = () => {
  const items = {
    "2024-03-01": [{ name: "Rickshaw Carry" }],
    "2024-03-02": [{ name: "Rip Curl" }],
    "2024-03-03": [{ name: "Benchpress" }]
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        showOnlySelectedDayItems
        renderItem={(item) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
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
});

export default calendar;
