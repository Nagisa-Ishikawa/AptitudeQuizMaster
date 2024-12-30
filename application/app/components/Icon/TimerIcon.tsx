import React from "react";
import timerIconPath from "../../../public/images/icons/timer.svg";
import { Icon } from "./Icon";

/** タイマーアイコン */
export const TimerIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return <Icon iconPath={timerIconPath} alt="タイマーアイコン" {...props} />;
};
