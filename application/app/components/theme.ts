import {
  colorsTuple,
  Button,
  MantineColorsTuple,
  createTheme,
} from "@mantine/core";

const primaryColor: MantineColorsTuple = [
  "#ebf3ff",
  "#d4e3fa",
  "#b9d2f5",
  "#9ec1f0",
  "#83b0eb",
  "#699fe6",
  "#0141A0",
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
    primaryColor: primaryColor,
    headerColor: colorsTuple("#CCCCCC"),
    bodyColor: colorsTuple("#FFFFFF"),
  },
  fontFamily: "YuGothic",
  primaryShade: 6,
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primaryColor",
        variant: "filled",
        radius: "xl",
      },
    }),
  },
});
