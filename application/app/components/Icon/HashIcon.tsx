import React from "react";
import hashIconPath from "../../../public/images/icons/hash.svg";
import { IconComponent } from "./IconComponent";

/** ハッシュマークアイコン */
export const HashIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return (
    <IconComponent iconPath={hashIconPath} alt="ハッシュアイコン" {...props} />
  );
};
