import React from "react";
import Icon from "../../../public/images/icons/add.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** アドアイコン */
export const AddIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="アドアイコン" />
    </ThemeIcon>
  );
};
