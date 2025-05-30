import { Colors, Spacing } from "@/constants/tokens";
import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { Label } from "./label";

interface ActionButtonProps {
  size?: "md" | "lg";
  label?: string;
  icon?: FC<SvgProps>;
}

export function ActionButton(props: Readonly<ActionButtonProps>) {
  const { size = "md", label = "", icon: Icon } = props;

  const circleStyles = size === "md" ? styles.circleMd : styles.circleLg;
  const iconStyles = size === "md" ? styles.iconMd : styles.iconLg;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.baseCircle, circleStyles]}>
        {Icon && (
          <Icon width={iconStyles.width} height={iconStyles.height} />
        )}
      </View>
      <Label size="m" color="light">
        {label}
      </Label>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing["2xl"],
  },
  baseCircle: {
    backgroundColor: Colors.background.base,
    borderColor: Colors.primary.base,
  },
  circleMd: {
    height: 62,
    width: 62,
    borderRadius: 31,
  },
  circleLg: {
    height: 84,
    width: 84,
    borderRadius: 42,
    borderWidth: 4,
    marginBottom: Spacing.s,
  },
  iconMd: {
    height: 62,
    width: 62,
  },
  iconLg: {
    height: 55,
    width: 55,
  },
});
