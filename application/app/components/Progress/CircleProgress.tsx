import { RingProgress, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { primaryColor, secondaryColor } from "../MantineTheme";

type Props = {
  value: number;
  label: string;
};

export const CircleProgress: React.FC<Props> = ({ value, label }: Props) => {
  const theme = useMantineTheme();
  return (
    <RingProgress
      size={100}
      rootColor={primaryColor}
      sections={[{ value: value, color: secondaryColor }]}
      label={
        <Text fw={theme.other.fontWeights.bold} ta="center" size="xs">
          {label}
        </Text>
      }
    />
  );
};
