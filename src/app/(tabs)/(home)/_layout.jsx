import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Exercises" }} />
    </Stack>
  );
};

export default Layout;
