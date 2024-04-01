import React from "react";
import Icon from "../../../public/images/icons/navigate_before.svg";

import { Image, ThemeIcon } from "@mantine/core";

/** 戻るアイコン */
export const NavigateBeforeIcon: React.FC = () => {
  return (
    <ThemeIcon>
      <Image src={Icon} alt="戻るアイコン" />
    </ThemeIcon>
  );
};
