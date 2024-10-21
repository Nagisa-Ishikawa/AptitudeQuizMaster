import {
  Button,
  Checkbox,
  colorsTuple,
  createTheme,
  Input,
  MantineColorsTuple,
  rem,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

const primaryColor = "#0141A0";
const secondaryColor = "#CCCCCC";
const highlightColor = "#CA7218";
const bodyColor = "#FFFFFF";
const textColor = "#121412";
const lightTextColor = "#676867";
const noteColor = "#D9D9D9";

const primaryColorPalette: MantineColorsTuple = [
  "#ebf3ff",
  "#d4e3fa",
  "#b9d2f5",
  "#9ec1f0",
  "#83b0eb",
  "#699fe6",
  primaryColor,
  "#002f76",
  "#00245f",
  "#002159",
];
const secondaryColorPallet: MantineColorsTuple = [
  "#FFFFFF",
  "#F2F2F2",
  "#EEEEEE",
  "#E5E5E5",
  "#DDDDDD",
  "#D8D8D8",
  secondaryColor,
  "#BFBFBF",
  "#B2B2B2",
  "#A5A5A5",
];

const bodyColorPallet: MantineColorsTuple = [
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#F2F2F2",
  "#E5E5E5",
  "#D8D8D8",
];

/**
 * mantine uiのテーマオブジェクト
 * mantine ui で使うコンポーネント全般の、デフォルトのカラーとかフォントとかを決める
 * 各コンポーネントの色は必ずcolorsで決めたパレットから使う
 */
export const theme = createTheme({
  colors: {
    primaryColor: colorsTuple(primaryColor),
    primaryColorPalette: primaryColorPalette,
    secondaryColor: colorsTuple(secondaryColor),
    secondaryColorPallet: secondaryColorPallet,
    highlightColor: colorsTuple(highlightColor),
    bodyColor: colorsTuple(bodyColor),
    bodyColorPallet: bodyColorPallet,
    textColor: colorsTuple(textColor),
    lightTextColor: colorsTuple(lightTextColor),
    noteColor: colorsTuple(noteColor),
  },
  fontFamily: "YuGothic",
  fontSizes: {
    xss: rem(12),
    xs: rem(14),
    sm: rem(16),
    md: rem(18),
    lg: rem(20),
    xl: rem(22),
    xll: rem(26),
    xlll: rem(30),
  },
  primaryShade: 6,
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primaryColorPalette",
        variant: "filled",
        radius: "xl",
      },
    }),
    Input: Input.extend({
      defaultProps: {
        radius: rem(8),
      },
    }),
    Text: Text.extend({
      defaultProps: {
        c: textColor,
      },
    }),
    Checkbox: Checkbox.extend({
      styles: {
        label: {
          cursor: "pointer",
        },
      },
      defaultProps: {
        color: "primaryColor",
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        size: "lg",
        variant: "transparent",
        radius: "0",
      },
    }),
    Title: Title.extend({
      defaultProps: {
        lts: rem(2),
        size: rem(32),
      },
    }),
  },
  other: {
    fontWeights: {
      light: 300,
      regular: 400,
      bold: 700,
    },
  },
});
