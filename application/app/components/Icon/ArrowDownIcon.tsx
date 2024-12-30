import React from "react";
import arrowDownIconPath from "../../../public/images/icons/keyboard_arrow_down.svg";
import { Icon } from "./Icon";

/** 下向きアイコン */
export const ArrowDownIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return <Icon iconPath={arrowDownIconPath} alt="下向きアイコン" {...props} />;
};
