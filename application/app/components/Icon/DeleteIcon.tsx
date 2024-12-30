import React from "react";
import deleteIconPath from "../../../public/images/icons/delete_forever.svg";
import { Icon } from "./Icon";

/** 削除アイコン */
export const DeleteIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return <Icon iconPath={deleteIconPath} alt="削除アイコン" {...props} />;
};
