import { Colors, Radius, Spacing } from "@/features/constants/tokens";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { MarkdownText } from "./ markdown";
import Skeleton from "./skeleton";

interface PopUpMessageProps {
  avatar: FC<SvgProps>;
  message: string;
  loading?: boolean,
}

export function PopUpMessage(props: Readonly<PopUpMessageProps>) {
  const { avatar: Avatar, message, loading } = props;

  return (
    <View style={styles.container}>
      <Avatar {...styles.avatar} />
      <View style={styles.messageContainer}>
        <View style={styles.messageArrow}>
          <Svg width={20} height={10} viewBox="0 0 20 10" fill="none">
            <Path d="M0 0 C10 20, 10 20, 20 0" fill="#753E05" />
          </Svg>
        </View>
        {
          loading ?
          <View style={styles.skeleton}>
            <Skeleton height={14} width={'100%'} radius={12} />
            <Skeleton height={14} width={'70%'} radius={12} />
            <Skeleton height={14} width={'80%'} radius={12} />
          </View>
          :
          <MarkdownText color="light">{message}</MarkdownText>

        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.l,
    alignItems: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
  },
  messageContainer: {
    flex: 1,
    backgroundColor: Colors.background.dark,
    position: "relative",
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.m,
    borderTopEndRadius: Radius.l,
    borderTopRightRadius: Radius.l,
    borderBottomEndRadius: Radius.l,
    borderBottomRightRadius: Radius.l,
    borderBottomLeftRadius: Radius.l,
    borderBottomStartRadius: Radius.l,
    borderEndEndRadius: Radius.l,
    borderEndStartRadius: Radius.l,
  },
  messageArrow: {
    position: "absolute",
    top: 0,
    left: -5,
  },
  skeleton: {
    flexDirection: 'column',
    gap: Spacing.s,
  }
});
