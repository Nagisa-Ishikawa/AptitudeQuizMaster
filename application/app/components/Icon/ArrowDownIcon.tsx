import React from "react";
import Icon from "../../../public/images/icons/keyboard_arrow_down.svg";

import { Image, ThemeIcon } from "@mantine/core";

/** 下向きアイコン */
export const ArrowDownIcon: React.FC = () => {
  return (
    <ThemeIcon>
      <Image src={Icon} alt="下向きアイコン" />
    </ThemeIcon>
  );
};
