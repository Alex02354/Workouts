import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Search" }} />
    </Stack>
  );
};

export default Layout;
