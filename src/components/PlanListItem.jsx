import { View, Text } from "react-native";
import { formatDistanceToNow } from "date-fns";

// Parse creation date from _id field
const PlanListItem = ({ plan }) => {
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
        gap: 5,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{plan.exercise} </Text>
      <Text style={{ fontWeight: "bold" }}>
        {plan.reps} x {plan.weight}
      </Text>

      {/* <Text style={{ color: "gray" }}>
        {formatDistanceToNow(createdAt)} ago
      </Text> */}
      <Text style={{ color: "gray" }}>{formattedDate}</Text>
    </View>
  );
};

export default PlanListItem;
