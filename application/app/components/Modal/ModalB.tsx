import { Modal, rem, useMantineTheme } from "@mantine/core";
import React, { ComponentProps } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
} & Omit<ComponentProps<typeof Modal>, "opened">;

/**
 * ヘッダーが赤いモーダル
 */
export const ModalB: React.FC<Props> = ({
  opened,
  onClose,
  children,
  ...props
}) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size={rem(800)}
      styles={{
        header: {
          padding: `${rem(16)} ${rem(40)}`,
          backgroundColor:
            theme.colors.primaryColor[theme.primaryShade as number],
        },
        title: {
          font: theme.fontFamily,
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.other.fontWeights.bold,
          color: theme.colors.errorColor[theme.primaryShade as number],
        },
        body: {
          padding: rem(32),
        },
      }}
      {...props}
    >
      {children}
    </Modal>
  );
};
