import { Colors, FontSize } from "@/features/constants/tokens";
import React, { useMemo } from "react";
import { Label } from "./label";

type FontSizeKey = keyof typeof FontSize;

interface MarkdownTextProps {
  children: string;
  fontSize?: FontSizeKey;
  color?: keyof typeof Colors.text;
}

export const MarkdownText = ({
  children,
  fontSize = "m",
  color = 'base',
}: Readonly<MarkdownTextProps>) => {
  // Divide el texto en partes entre **bold**
  const parts = useMemo(() => children.split(/(\*\*.*?\*\*)/g), [children]);

  return (
    <Label>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const boldText = part.slice(2, -2);
          return (
            <Label key={`${part}_${index}`} weidth="bold" size={fontSize} color={color}>
              {boldText}
            </Label>
          );
        } else {
          return <Label key={`${part}_${index}`} size={fontSize} color={color}>{part}</Label>;
        }
      })}
    </Label>
  );
};
