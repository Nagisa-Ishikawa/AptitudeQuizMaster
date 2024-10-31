import React from "react";
import Icon from "../../../public/images/icons/delete_forever.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** 削除アイコン */
export const DeleteIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="削除アイコン" />
    </ThemeIcon>
  );
};
