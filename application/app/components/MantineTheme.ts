import {
  colorsTuple,
  Button,
  MantineColorsTuple,
  createTheme,
  rem,
  ThemeIcon,
  Text,
} from "@mantine/core";

const bodyColor = "#FFFFFF";
const textColor = "#121412";
export const primaryColor = "#0141A0";
export const secondaryColor = "#CCCCCC";

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
    headerColor: colorsTuple(secondaryColor),
    bodyColor: colorsTuple(bodyColor),
    textColor: colorsTuple(textColor),
  },
  fontFamily: "YuGothic",
  fontSizes: {
    xs: rem(14),
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
        color: textColor,
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        size: "lg",
        variant: "transparent",
        radius: "0",
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
