import { useMantineTheme } from "@mantine/core";
import { Link as RemixLink } from "@remix-run/react";

type Props = {
  text: string;
  to: string;
};

export const Link: React.FC<Props> = ({ text, to }: Props) => {
  const theme = useMantineTheme();
  return (
    <RemixLink
      to={to}
      style={{
        color: theme.colors.textColor[theme.primaryShade as number],
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.other.fontWeights.bold,
        textDecorationLine: "none",
      }}
    >
      {text}
    </RemixLink>
  );
};
