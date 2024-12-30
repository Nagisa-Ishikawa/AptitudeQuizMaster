import React from "react";
import filterIconPath from "../../../public/images/icons/filter_alt.svg";
import { IconComponent } from "./IconComponent";

/** フィルターアイコン */
export const FilterIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return (
    <IconComponent
      iconPath={filterIconPath}
      alt="フィルターアイコン"
      {...props}
    />
  );
};
