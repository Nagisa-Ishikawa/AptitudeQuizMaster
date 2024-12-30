import React from "react";
import keyIconPath from "../../../public/images/icons/key.svg";
import { Icon } from "./Icon";

/** 鍵アイコン */
export const KeyIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return <Icon iconPath={keyIconPath} alt="鍵アイコン" {...props} />;
};
