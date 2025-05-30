import { Navbar } from "@/components/navbar";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    Outfit: require("../assets/fonts/Outfit.ttf"),
  });

  const indexHeader = useCallback(() => <Navbar label="Breed Dog Finder" />, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{
          header: indexHeader
        }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
