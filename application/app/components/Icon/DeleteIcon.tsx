import React from "react";
import deleteIconPath from "../../../public/images/icons/delete_forever.svg";
import { IconComponent } from "./IconComponent";

/** 削除アイコン */
export const DeleteIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return (
    <IconComponent iconPath={deleteIconPath} alt="削除アイコン" {...props} />
  );
};
