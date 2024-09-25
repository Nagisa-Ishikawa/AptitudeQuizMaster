import {
  Paper as MantinePaper,
  PaperProps,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";

type CustomPaperProps = {
  children: ReactNode;
} & PaperProps;

/**
 * 青い枠
 */
export const Paper: React.FC<CustomPaperProps> = ({
  children,
  ...props
}: CustomPaperProps) => {
  const theme = useMantineTheme();
  return (
    <MantinePaper
      style={{
        padding: rem(40),
        borderRadius: rem(0),
        border: `${rem(2)} solid ${
          theme.colors.primaryColor[theme.primaryShade as number]
        }`,
      }}
      {...props}
    >
      {children}
    </MantinePaper>
  );
};
