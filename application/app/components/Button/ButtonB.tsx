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
 * グレーのボタン
 */
export const ButtonB: React.FC<Props> = ({ ...props }: Props) => {
  const theme = useMantineTheme();

  return (
    <Button
      color={theme.colors.bodyColorPallet[theme.primaryShade as number]}
      style={{
        color: theme.colors.textColor[theme.primaryShade as number],
        borderColor: theme.colors.secondaryColor[theme.primaryShade as number],
      }}
      {...props}
    />
  );
};
