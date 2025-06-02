import BackIcon from "@/assets/icons/arrow-left.svg";
import HeaderIcon from "@/assets/icons/icon.svg";
import MoreIcon from "@/assets/icons/more.svg";
import { Colors, Spacing } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Label } from "./label";

interface NavbarProps {
  back?: boolean;
  more?: boolean;
  moreAction?: () => void;
}

export function Navbar(props: Readonly<NavbarProps>) {
  const { back, more, moreAction } = props;
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.container}>
          <Pressable style={styles.button}  onPress={() => router.back()}>{back && <BackIcon />}</Pressable>
          <View style={styles.headerContainer}>
            <HeaderIcon />
            <Label color="light" size="2xl" weidth="bold" style={styles.text}>
              Breed Dog Finder
            </Label>
          </View>
          <Pressable
            style={styles.button}
            onPress={more ? moreAction : undefined}
          >
            {more && <MoreIcon />}
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background.dark,
  },
  container: {
    backgroundColor: Colors.background.dark,
    paddingBottom: Spacing.m,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.l,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.l,
  },
  text: {
    textAlign: "center",
  },
  button: {
    width: 30,
    height: 30,
  },
});
