import React from "react";
import Icon from "../../../public/images/icons/key.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** 鍵アイコン */
export const KeyIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="鍵アイコン" />
    </ThemeIcon>
  );
};
