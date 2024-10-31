import React from "react";
import Icon from "../../../public/images/icons/keyboard_arrow_up.svg";

import { Image, ThemeIcon } from "@mantine/core";

/** 上向きアイコン */
export const ArrowUpIcon: React.FC = () => {
  return (
    <ThemeIcon>
      <Image src={Icon} alt="上向きアイコン" />
    </ThemeIcon>
  );
};
