import React from "react";
import Icon from "../../../public/images/icons/hash.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** ハッシュマークアイコン */
export const HashIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="ハッシュアイコン" />
    </ThemeIcon>
  );
};
