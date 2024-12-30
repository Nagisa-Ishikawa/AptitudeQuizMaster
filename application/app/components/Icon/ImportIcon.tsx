import React from "react";
import importIconPath from "../../../public/images/icons/file_download.svg";
import { Icon } from "./Icon";

/** インポートアイコン */
export const ImportIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return <Icon iconPath={importIconPath} alt="インポートアイコン" {...props} />;
};
