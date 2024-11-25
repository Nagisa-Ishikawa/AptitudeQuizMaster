import { Badge, rem, useMantineTheme } from "@mantine/core";
import React, { ComponentProps } from "react";

type Props = {
  value: number;
} & ComponentProps<typeof Badge>;

/**
 * id表示用バッジ
 */
export const IdBadge: React.FC<Props> = ({ value, ...props }) => {
  const theme = useMantineTheme();
  return (
    <Badge
      px={rem(6)}
      size="lg"
      variant="default"
      style={{
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.other.fontWeights.regular,
      }}
      {...props}
    >
      {value}
    </Badge>
  );
};
