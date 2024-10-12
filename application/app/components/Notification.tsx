import {
  Notification as MantineNotification,
  Portal,
  rem,
} from "@mantine/core";
import React from "react";

type Props = {
  /** 通知タイトル */
  title: string;
  /** 通知のbodyに出すもの 詳細メッセージ等を入れる */
  children?: React.ReactNode;
  /** 通知の種類 */
  mode: "success" | "error";
  onClose: () => void;
};

/**
 * 画面上部に出す通知
 */
export const Notification: React.FC<Props> = ({
  title,
  children,
  onClose,
}: Props) => {
  return (
    <Portal>
      <MantineNotification
        title={title}
        style={{
          position: "fixed",
          top: rem(20),
          left: "50%",
          transform: "translate(-50%, 0%)",
        }}
        onClose={onClose}
      >
        {children}
      </MantineNotification>
    </Portal>
  );
};
