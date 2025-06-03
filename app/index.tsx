import { HomeScreen } from "@/features/screens//home/home-screen";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

export default function Home() {
  const onLayoutRootView = useCallback(() => {
    SplashScreen.hide();
  }, []);

  return <HomeScreen onLayout={onLayoutRootView} />;
}
