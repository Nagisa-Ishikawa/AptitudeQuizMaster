import React from "react";
import keyIconPath from "../../../public/images/icons/key.svg";
import { IconComponent } from "./IconComponent";

/** 鍵アイコン */
export const KeyIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return <IconComponent iconPath={keyIconPath} alt="鍵アイコン" {...props} />;
};
