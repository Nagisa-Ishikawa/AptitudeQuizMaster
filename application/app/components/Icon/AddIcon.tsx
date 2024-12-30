import React from "react";
import addIconPath from "../../../public/images/icons/add.svg";
import { Icon } from "./Icon";

// 追加アイコン
export const AddIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return <Icon iconPath={addIconPath} alt="追加アイコン" {...props} />;
};
