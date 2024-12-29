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
 * inputのような枠
 */
export const PaperB: React.FC<CustomPaperProps> = ({
  children,
  borderWidth = rem(1),
  ...props
}: CustomPaperProps) => {
  const theme = useMantineTheme();
  return (
    <MantinePaper
      style={{
        padding: rem(40),
        borderRadius: rem(8),
        border: `${borderWidth} solid ${
          theme.colors.secondaryColor[theme.primaryShade as number]
        }`,
      }}
      {...props}
    >
      {children}
    </MantinePaper>
  );
};
