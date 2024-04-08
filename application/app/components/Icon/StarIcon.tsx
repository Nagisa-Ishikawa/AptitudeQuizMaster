import React from "react";
import Icon from "../../../public/images/icons/star.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size: string;
};

/** 星アイコン */
export const StarIcon: React.FC<Props> = ({ size }: Props) => {
  return (
    <ThemeIcon size={size}>
      <Image w={size} h={size} src={Icon} alt="星アイコン" />
    </ThemeIcon>
  );
};
