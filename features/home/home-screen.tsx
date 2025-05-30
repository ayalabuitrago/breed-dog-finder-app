import GalleryIcon from "@/assets/icons/gallery.svg";
import HistoryIcon from "@/assets/icons/history.svg";
import { ActionButton } from "@/components/action-button";
import { useHeaderHeight } from "@react-navigation/elements";
import { ImageBackground, View } from "react-native";
import { homeScreenStyle } from "./styles/home-screen.styles";

export function HomeScreen() {
  const headerHeight = useHeaderHeight();
  return (
    <ImageBackground
      style={[homeScreenStyle.container, { paddingTop: headerHeight }]}
      source={require("@/assets/images/background.png")}
    >
      <View style={homeScreenStyle.content}></View>
      <View style={homeScreenStyle.footer}>
        <ActionButton label="Historial" icon={HistoryIcon} />
        <ActionButton size="lg" />
        <ActionButton label="Importar" icon={GalleryIcon} />
      </View>
    </ImageBackground>
  );
}
