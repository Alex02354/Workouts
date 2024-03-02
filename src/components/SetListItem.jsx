import { View, Text } from "react-native";
import { formatDistanceToNow } from "date-fns";

// Parse creation date from _id field
const SetListItem = ({ set }) => {
  const timestamp = parseInt(set._id.substr(0, 8), 16) * 1000;
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

      <Text>{set.exercise}</Text>
      <Text style={{ fontWeight: "bold" }}>
        
        {set.reps} x {set.weight}
      </Text>

      <Text style={{ color: "gray" }}>{formatDistanceToNow(createdAt)}</Text>
      <Text style={{ color: "gray" }}>{formattedDate}</Text>
    </View>
  );
};

export default SetListItem;
