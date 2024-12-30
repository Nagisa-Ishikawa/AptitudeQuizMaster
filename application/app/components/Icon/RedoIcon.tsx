import React from "react";
import redoIconPath from "../../../public/images/icons/redo.svg";
import { Icon } from "./Icon";

/** リドゥアイコン */
export const RedoIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return <Icon iconPath={redoIconPath} alt="リドゥアイコン" {...props} />;
};
