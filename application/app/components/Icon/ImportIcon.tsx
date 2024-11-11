import React from "react";
import importIconPath from "../../../public/images/icons/file_download.svg";
import { IconComponent } from "./IconComponent";

/** インポートアイコン */
export const ImportIcon: React.FC<{ size?: string; [key: string]: unknown }> = (
  props
) => {
  return (
    <IconComponent
      iconPath={importIconPath}
      alt="インポートアイコン"
      {...props}
    />
  );
};
