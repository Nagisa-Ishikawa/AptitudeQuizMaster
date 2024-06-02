import { Paper, rem, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

interface CustomPaperProps {
  children: ReactNode;
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  fontSize?: string;
  maxWidth?: string;
}

const CustomPaper = ({
  children,
  padding = rem(40),
  margin = `${rem(80)} auto`,
  border = `${rem(2)} solid #0141A0`,
  borderRadius = "0",
  fontSize,
  maxWidth = rem(1280),
}: CustomPaperProps) => {
  const theme = useMantineTheme();
  return (
    <Paper
      style={{
        margin,
        border,
        padding,
        borderRadius,
        fontSize: fontSize || theme.fontSizes.md,
        maxWidth,
      }}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
