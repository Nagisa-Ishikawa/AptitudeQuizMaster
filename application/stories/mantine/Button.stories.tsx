import { Button } from "@mantine/core";

export default {
  title: "Mantine/Button",
  component: Button,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "ボタン",
  },
};

export const SecondaryColor = {
  args: {
    children: "ボタン",
    color: "secondaryColorPallet",
  },
};
