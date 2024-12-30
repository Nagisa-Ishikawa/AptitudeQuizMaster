import React from "react";
import hashIconPath from "../../../public/images/icons/hash.svg";
import { Icon } from "./Icon";

/** ハッシュマークアイコン */
export const HashIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return <Icon iconPath={hashIconPath} alt="ハッシュアイコン" {...props} />;
};
