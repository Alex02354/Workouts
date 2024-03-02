import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="calendar" />
    </Tabs>
  );
};
