import React from "react";
import Icon from "../../../public/images/icons/filter_alt.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** フィルターアイコン */
export const FilterIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="フィルターアイコン" />
    </ThemeIcon>
  );
};
