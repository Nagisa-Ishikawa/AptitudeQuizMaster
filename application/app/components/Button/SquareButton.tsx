import {
  Button,
  ButtonProps,
  PolymorphicComponentProps,
  useMantineTheme,
} from "@mantine/core";

type Props = {
  type?: "submit" | "reset" | "button";
} & PolymorphicComponentProps<"button", ButtonProps>;

/**
 * 四角のボタン
 */
export const SquareButton: React.FC<Props> = ({ ...props }: Props) => {
  const theme = useMantineTheme();

  return (
    <Button
      variant="outline"
      radius={theme.radius.md}
      bg={theme.colors.bodyColorPallet[theme.primaryShade as number]}
      styles={{ section: { marginInlineEnd: "0" } }} //Styles APIでアイコンとボタンの間のスペースを調整
      {...props}
    />
  );
};
