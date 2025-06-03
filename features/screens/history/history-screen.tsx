import FootprintIcon from "@/assets/icons/footprint.svg";
import { useHistory } from "@/domain/hooks/use-history";
import { getTimeElapsed } from "@/domain/utils/date";
import { ActionButton } from "@/features/components/action-button";
import { Label } from "@/features/components/label";
import { ListItem } from "@/features/components/list-item";
import { useScrollContentSize } from "@/features/hooks/use-scroll-content-size";
import { useRouter } from "expo-router";
import { FlatList, ImageBackground, View } from "react-native";
import { homeScreenStyle } from "../home/styles/home-screen.styles";
import { historyScreenStyles } from "./styles";

export function HistoryScreen() {
  const router = useRouter();
  const { history } = useHistory();

  const scrollProps = useScrollContentSize();

  return (
    <ImageBackground
      style={historyScreenStyles.container}
      source={require("@/assets/images/background.png")}
    >
      <View style={historyScreenStyles.content}>
        <View style={historyScreenStyles.labelContainer}>
          <Label size="2xl" weidth="bold">
            Historial
          </Label>
        </View>
        <FlatList
          style={historyScreenStyles.flatlist}
          contentContainerStyle={historyScreenStyles.flatlistContainer}
          data={history}
          renderItem={({ item }) => (
            <ListItem
              title={item.breed_dog}
              imageUri={item.image_uri}
              subtitle={`${item.accuracy}% de precisión`}
              meta={`Tomada hace ${getTimeElapsed(item.date)}`}
            />
          )}
          {...scrollProps}
        />
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
