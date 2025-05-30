import { Colors, Spacing } from "@/constants/tokens";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Label } from "./label";

interface NavbarProps {
  label: string;
}

export function Navbar(props: Readonly<NavbarProps>) {
  const { label } = props;
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.container}>
          <Label color="light" size="2xl" weidth="bold" style={styles.text}>
            {label}
          </Label>
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
    paddingBottom: Spacing.m
  },
  text: {
    textAlign: "center",
  },
});
