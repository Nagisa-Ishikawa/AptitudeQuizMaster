import {
  colorsTuple,
  Button,
  MantineColorsTuple,
  createTheme,
  rem,
  ThemeIcon,
  Text,
  Title,
} from "@mantine/core";

const primaryColor = "#0141A0";
const secondaryColor = "#CCCCCC";
const highlightColor = "#CA7218";
const bodyColor = "#FFFFFF";
const textColor = "#121412";
const lightTextColor = "#676867";

const primaryColorPalette: MantineColorsTuple = [
  "#ebf3ff",
  "#d4e3fa",
  "#b9d2f5",
  "#9ec1f0",
  "#83b0eb",
  "#699fe6",
  primaryColor,
  "#013c97",
  "#013282",
  "#01286d",
];

/**
 * mantine uiのテーマオブジェクト
 * mantine ui で使うコンポーネント全般の、デフォルトのカラーとかフォントとかを決める
 * 各コンポーネントの色は必ずcolorsで決めたパレットから使う
 */
export const theme = createTheme({
  colors: {
    primaryColor: primaryColorPalette,
    secondaryColor: colorsTuple(secondaryColor),
    highlightColor: colorsTuple(highlightColor),
    bodyColor: colorsTuple(bodyColor),
    textColor: colorsTuple(textColor),
    lightTextColor: colorsTuple(lightTextColor),
  },
  fontFamily: "YuGothic",
  fontSizes: {
    xs: rem(12),
    sm: rem(16),
    md: rem(18),
    lg: rem(20),
    xl: rem(22),
  },
  primaryShade: 6,
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primaryColor",
        variant: "filled",
        radius: "xl",
      },
    }),
    Text: Text.extend({
      defaultProps: {
        c: textColor,
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
        lts: "2px",
        size: "32px",
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
