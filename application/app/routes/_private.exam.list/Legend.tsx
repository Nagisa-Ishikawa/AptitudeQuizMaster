import { Stack, Text, rem, useMantineTheme } from "@mantine/core";
import React, { ReactNode } from "react";

type Props = {
  label: string;
  sample: ReactNode;
};

export const Legend: React.FC<Props> = ({ label, sample }: Props) => {
  const theme = useMantineTheme();
  return (
    <Stack w={rem(64)} gap={0} align="center">
      {sample}
      <Text
        c={theme.colors.lightTextColor[theme.primaryShade as number]}
        style={{
          fontWeight: theme.other.fontWeights.bold,
          fontSize: theme.fontSizes.xs,
        }}
      >
        {label}
      </Text>
    </Stack>
  );
};
