import { Colors, FontFamily, FontSize, FontWeidth } from "@/constants/tokens";
import { Text, type TextStyle } from "react-native";

interface LabelProps {
  size?: keyof typeof FontSize;
  color?: keyof typeof Colors.text;
  weidth?: keyof typeof FontWeidth;
  style?: TextStyle,
  children: string;
}

export function Label(props: Readonly<LabelProps>) {
  const { children, color = 'base', size = 'm', weidth = 'regular', style } = props;
  return (
    <Text
      style={{
        ...style,
        color: Colors.text[color],
        fontSize: FontSize[size],
        fontFamily: FontFamily.outfit,
        fontWeight: FontWeidth[weidth]
      }}
    >
      {children}
    </Text>
  );
}
