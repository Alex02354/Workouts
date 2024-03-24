import React from "react"
import { View, Text, Pressable, TouchableOpacity } from "react-native"
import { formatDistanceToNow } from "date-fns"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"

const PlanListItem = ({ plan, onDelete, onUpdate }) => {
  const timestamp = parseInt(plan._id.substr(0, 8), 16) * 1000
  const createdAt = new Date(timestamp)
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <Link href={`/${plan.exercise}`} asChild>
      <Pressable
        style={{
          backgroundColor: plan.completed ? "#90EE90" : "white", // Conditionally change background color
          marginVertical: 5,
          padding: 10,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          marginHorizontal: 10,
          elevation: 3,
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>{plan.exercise} </Text>
          <Text style={{ fontWeight: "bold" }}>
            {plan.reps} x {plan.weight}
          </Text>
        </View>

        <View
          style={{
            gap: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/*         <Text style={{ color: "gray" }}>{formattedDate}</Text> */}
          <TouchableOpacity
            onPress={() => {
              onUpdate(
                plan.exercise,
                !plan.completed,
                plan.reps,
                plan.weight,
                plan.username
              )
            }}
          >
            <Ionicons name="checkmark-circle-outline" size={26} color="green" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(plan.exercise)}>
            <Ionicons name="trash-outline" size={26} color="red" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Link>
  )
}

export default PlanListItem
