import FootprintIcon from "@/assets/icons/footprint.svg";
import { ActionButton } from "@/components/action-button";
import { Label } from "@/components/label";
import { useRouter } from "expo-router";
import { ImageBackground, View } from "react-native";
import { homeScreenStyle } from "../home/styles/home-screen.styles";
import { historyScreenStyles } from "./styles";

export function HistoryScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      style={historyScreenStyles.container}
      source={require("@/assets/images/background.png")}
    >
      <View style={historyScreenStyles.content}>
        <View style={historyScreenStyles.labelContainer}>
            <Label size="2xl" weidth="bold">Historial</Label>
        </View>
      </View>
      <View style={homeScreenStyle.footer}>
        <ActionButton
          size="lg"
          onPress={() => router.back()}
          icon={FootprintIcon}
          label="Inicio"
        />
      </View>
    </ImageBackground>
  );
}
