import React from "react";
import arrowUpIconPath from "../../../public/images/icons/keyboard_arrow_up.svg";
import { IconComponent } from "./IconComponent";

/** 上向きアイコン */
export const ArrowUpIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return (
    <IconComponent iconPath={arrowUpIconPath} alt="上向きアイコン" {...props} />
  );
};
