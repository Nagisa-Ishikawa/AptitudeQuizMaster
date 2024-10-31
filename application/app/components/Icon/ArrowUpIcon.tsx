import React from "react";
import Icon from "../../../public/images/icons/keyboard_arrow_up.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** 上向きアイコン */
export const ArrowUpIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="上向きアイコン" />
    </ThemeIcon>
  );
};
