import {
  Textarea as MantineTextarea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof MantineTextarea>;

export const Textarea: React.FC<Props> = ({ ...props }) => {
  const theme = useMantineTheme();
  return (
    <MantineTextarea
      placeholder={props.label ? `${props.label}を入力してください` : undefined}
      styles={{
        label: {
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.other.fontWeights.bold,
          marginBottom: rem(4),
        },
        input: { padding: rem(10), height: rem(100) },
      }}
      {...props}
    />
  );
};
