import React from "react";
import arrowUpIconPath from "../../../public/images/icons/keyboard_arrow_up.svg";
import { Icon } from "./Icon";

/** 上向きアイコン */
export const ArrowUpIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return <Icon iconPath={arrowUpIconPath} alt="上向きアイコン" {...props} />;
};
