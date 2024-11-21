import React from "react";
import uploadIconPath from "../../../public/images/icons/file_upload.svg";
import { IconComponent } from "./IconComponent";

/** エクスポートアイコン */
export const ExportIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return (
    <IconComponent
      iconPath={uploadIconPath}
      alt="エクスポートアイコン"
      {...props}
    />
  );
};
