import { RingProgress, Text, useMantineTheme } from "@mantine/core";
import React from "react";

type Props = {
  /** プログレスの値 0 ~ 100 */
  value: number;
  /** 中心に表示するラベル */
  label: string;
};

/**
 * 円のプログレス
 */
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
