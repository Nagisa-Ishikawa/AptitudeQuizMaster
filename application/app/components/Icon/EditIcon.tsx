import React from "react";
import editIconPath from "../../../public/images/icons/edit.svg";
import { IconComponent } from "./IconComponent";

/** 編集アイコン */
export const EditIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return (
    <IconComponent iconPath={editIconPath} alt="編集アイコン" {...props} />
  );
};
