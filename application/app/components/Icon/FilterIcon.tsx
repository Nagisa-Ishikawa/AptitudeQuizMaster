import React from "react";
import filterIconPath from "../../../public/images/icons/filter_alt.svg";
import { Icon } from "./Icon";

/** フィルターアイコン */
export const FilterIcon: React.FC<{
  size?: string;
  [key: string]: unknown;
}> = (props) => {
  return <Icon iconPath={filterIconPath} alt="フィルターアイコン" {...props} />;
};
