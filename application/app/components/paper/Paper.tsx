import { Paper, rem, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

interface CustomPaperProps {
  children: ReactNode;
}

const CustomPaper = ({ children }: CustomPaperProps) => {
  const theme = useMantineTheme();
  return (
    <Paper
      style={{
        margin: `${rem(80)} auto`,
        border: `${rem(2)} solid #0141A0`,
        padding: rem(40),
        borderRadius: 0,
        fontSize: theme.fontSizes.md,
        maxWidth: rem(1280),
      }}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
