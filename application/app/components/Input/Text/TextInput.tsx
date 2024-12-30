import {
  TextInput as MantineTextInput,
  rem,
  useMantineTheme,
} from "@mantine/core";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof MantineTextInput>;

export const TextInput: React.FC<Props> = ({ ...props }) => {
  const theme = useMantineTheme();
  return (
    <MantineTextInput
      placeholder={props.label ? `${props.label}を入力してください` : undefined}
      styles={{
        label: {
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.other.fontWeights.bold,
          marginBottom: rem(4),
        },
        input: { padding: rem(10), height: rem(48) },
      }}
      {...props}
    />
  );
};
