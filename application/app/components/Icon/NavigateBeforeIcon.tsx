import React from "react";
import navigateBeforeIconPath from "../../../public/images/icons/navigate_before.svg";
import { IconComponent } from "./IconComponent";

/** 戻るアイコン */
export const NavigateBeforeIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return (
    <IconComponent
      iconPath={navigateBeforeIconPath}
      alt="戻るアイコン"
      {...props}
    />
  );
};
