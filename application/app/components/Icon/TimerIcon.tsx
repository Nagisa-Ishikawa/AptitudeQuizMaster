import React from "react";
import Icon from "../../../public/images/icons/timer.svg";

import { Image, ThemeIcon } from "@mantine/core";

/** タイマーアイコン */
export const TimerIcon: React.FC = () => {
  return (
    <ThemeIcon>
      <Image src={Icon} alt="タイマーアイコン" />
    </ThemeIcon>
  );
};
