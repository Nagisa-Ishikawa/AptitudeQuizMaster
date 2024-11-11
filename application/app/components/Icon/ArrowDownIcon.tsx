import React from "react";
import arrowDownIconPath from "../../../public/images/icons/keyboard_arrow_down.svg";
import { IconComponent } from "./IconComponent";

/** 下向きアイコン */
export const ArrowDownIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return (
    <IconComponent
      iconPath={arrowDownIconPath}
      alt="下向きアイコン"
      {...props}
    />
  );
};
