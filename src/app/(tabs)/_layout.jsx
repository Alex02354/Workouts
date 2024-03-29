import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "purple" }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Exercises",
          tabBarLabel: "Exercises",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          unmountOnBlur: true,
          title: "Summary",
          tabBarLabel: "Summary",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarLabel: "Planner",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="lottie"
        options={{
          title: "Lottie",
          tabBarLabel: "Lottie",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="arrow-forward-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  )
}
