import React from "react";
import Icon from "../../../public/images/icons/keyboard_arrow_down.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** 下向きアイコン */
export const ArrowDownIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="下向きアイコン" />
    </ThemeIcon>
  );
};
