import { Pill as MantinePill, rem, useMantineTheme } from "@mantine/core";
import React from "react";

type Props = {
  children: React.ReactNode;
} & React.ComponentProps<typeof MantinePill>;

export const Pill: React.FC<Props> = ({ children, ...props }: Props) => {
  const theme = useMantineTheme();
  return (
    <MantinePill
      p={`${rem(4)} ${rem(16)}`}
      h="auto"
      w="auto"
      style={{ fontWeight: theme.other.fontWeights.bold }}
      {...props}
    >
      {children}
    </MantinePill>
  );
};
