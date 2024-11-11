import React from "react";
import Icon from "../../../public/images/icons/manage_accounts.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** アカウント編集アイコン */
export const ManageAccountsIcon: React.FC<Props> = ({
  size,
  ...props
}: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="アカウント編集アイコン" />
    </ThemeIcon>
  );
};
