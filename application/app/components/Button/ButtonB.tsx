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
 * 白・グレーのボタン
 */
export const ButtonB: React.FC<Props> = ({ type, ...props }: Props) => {
  const theme = useMantineTheme();

  return (
    <Button
      type={type}
      color={theme.colors.bodyColorPallet[theme.primaryShade as number]}
      style={{
        color: theme.colors.textColor[theme.primaryShade as number],
        borderColor: theme.colors.secondaryColor[theme.primaryShade as number],
      }}
      {...props}
    />
  );
};
