import React from "react";
import redoIconPath from "../../../public/images/icons/redo.svg";
import { IconComponent } from "./IconComponent";

/** リドゥアイコン */
export const RedoIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return (
    <IconComponent iconPath={redoIconPath} alt="リドゥアイコン" {...props} />
  );
};
