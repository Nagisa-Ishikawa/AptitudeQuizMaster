import { RingProgress, Text, useMantineTheme } from "@mantine/core";
import React from "react";

type Props = {
  value: number;
  label: string;
};

export const CircleProgress: React.FC<Props> = ({ value, label }: Props) => {
  const theme = useMantineTheme();
  return (
    <RingProgress
      size={100}
      rootColor={theme.colors.primaryColor[theme.primaryShade as number]}
      sections={[
        {
          value: value,
          color: theme.colors.secondaryColor[theme.primaryShade as number],
        },
      ]}
      label={
        <Text fw={theme.other.fontWeights.bold} ta="center" size="xs">
          {label}
        </Text>
      }
    />
  );
};
