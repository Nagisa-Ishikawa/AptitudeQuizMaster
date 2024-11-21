import React from "react";
import addIconPath from "../../../public/images/icons/add.svg";
import { IconComponent } from "./IconComponent";

// 追加アイコン
export const AddIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return <IconComponent iconPath={addIconPath} alt="追加アイコン" {...props} />;
};
