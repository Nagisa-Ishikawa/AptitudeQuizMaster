import { Button, ButtonProps, PolymorphicComponentProps } from "@mantine/core";

type Props = {
  type?: "submit" | "reset" | "button";
} & PolymorphicComponentProps<"button", ButtonProps>;

/**
 * 青のボタン
 */
export const ButtonA: React.FC<Props> = ({ ...props }: Props) => {
  return <Button {...props} />;
};
