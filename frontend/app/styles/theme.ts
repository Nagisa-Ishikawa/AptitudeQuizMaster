import { Button, MantineColorsTuple, createTheme } from "@mantine/core";

const primaryColor: MantineColorsTuple = [
  "#ebf3ff",
  "#d4e3fa",
  "#b9d2f5",
  "#9ec1f0",
  "#83b0eb",
  "#699fe6",
  "#0146ac",
  "#013c97",
  "#013282",
  "#01286d",
];

/** mantine uiのテーマオブジェクト
 * mantine ui で使うコンポーネント全般の、デフォルトのカラーとかフォントとかを決める
 */
export const theme = createTheme({
  colors: { primaryColor: primaryColor },
  fontFamily: "YuGothic",
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
