import React from "react";
import uploadIconPath from "../../../public/images/icons/file_upload.svg";
import { Icon } from "./Icon";

/** エクスポートアイコン */
export const ExportIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return (
    <Icon iconPath={uploadIconPath} alt="エクスポートアイコン" {...props} />
  );
};
