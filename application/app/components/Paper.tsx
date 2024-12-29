import {
  Paper as MantinePaper,
  PaperProps,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";

type CustomPaperProps = {
  children: ReactNode;
  borderWidth?: string;
} & PaperProps;

/**
 * 青い枠
 */
export const Paper: React.FC<CustomPaperProps> = ({
  children,
  borderWidth = rem(2),
  ...props
}: CustomPaperProps) => {
  const theme = useMantineTheme();
  return (
    <MantinePaper
      style={{
        padding: rem(40),
        borderRadius: rem(0),
        border: `${borderWidth} solid ${
          theme.colors.primaryColor[theme.primaryShade as number]
        }`,
      }}
      {...props}
    >
      {children}
    </MantinePaper>
  );
};
