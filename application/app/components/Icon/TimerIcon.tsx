import React from "react";
import timerIconPath from "../../../public/images/icons/timer.svg";
import { IconComponent } from "./IconComponent";

/** タイマーアイコン */
export const TimerIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return (
    <IconComponent iconPath={timerIconPath} alt="タイマーアイコン" {...props} />
  );
};
