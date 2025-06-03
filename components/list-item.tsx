import { Colors, Radius, Spacing } from "@/constants/tokens";
import { Image, StyleSheet, View } from "react-native";
import { Label } from "./label";

interface ListItemProps {
  title: string;
  imageUri: string;
  subtitle?: string;
  meta?: string;
}

export function ListItem(props: Readonly<ListItemProps>) {
  const { title, imageUri, subtitle, meta } = props;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Label size="xl" color="base" weidth="bold">
            {title}
          </Label>
          {!!subtitle && (
            <Label size="s" color="base">
              {subtitle}
            </Label>
          )}
        </View>
        {!!meta && (
          <View style={styles.metaContainer}>
            <Label size="s" color="base">
              {meta}
            </Label>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xl,
    backgroundColor: Colors.background.light,
    padding: Spacing.s,
    gap: Spacing.s,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    backgroundColor: Colors.background.dark,
    borderRadius: Radius.l,
  },
  content: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  titleContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
  },
  metaContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
  },
});
