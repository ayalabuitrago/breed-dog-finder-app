import { Navbar } from "@/components/navbar";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const indexHeader = useCallback(() => <Navbar more />, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        const fonts = Font.loadAsync({
          Outfit: require("../assets/fonts/Outfit.ttf"),
        });
        // Artificially delay for two seconds
        const fake = new Promise((resolve) => setTimeout(resolve, 2000));

        await Promise.all([fonts, fake]);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: indexHeader,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </QueryClientProvider>
  );
}
