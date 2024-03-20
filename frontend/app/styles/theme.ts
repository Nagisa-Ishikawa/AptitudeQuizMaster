import { MantineColorsTuple, createTheme } from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#ebf3ff",
  "#d4e3fa",
  "#a3c4f6",
  "#70a3f5",
  "#4987f4",
  "#3575f4",
  "#2b6cf5",
  "#215cdb",
  "#1751c3",
  "#0146ac",
];

export const theme = createTheme({
  defaultRadius: "xl",
  colors: { myColor },
});
