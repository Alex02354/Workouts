import { View, Text, Pressable } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

// Parse creation date from _id field
const PlanListItem = ({ plan, onDelete }) => {
  const timestamp = parseInt(plan._id.substr(0, 8), 16) * 1000;
  const createdAt = new Date(timestamp);

  // Format date in days, month, year format
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold" }}>{plan.exercise} </Text>
        <Text style={{ fontWeight: "bold" }}>
          {plan.reps} x {plan.weight}
        </Text>
      </View>
      {/* <Text style={{ color: "gray" }}>
        {formatDistanceToNow(createdAt)} ago
      </Text> */}
      <Text style={{ color: "gray" }}>{formattedDate}</Text>

      <Pressable onPress={() => onDelete(plan.exercise)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </Pressable>
    </View>
  );
};

export default PlanListItem;
