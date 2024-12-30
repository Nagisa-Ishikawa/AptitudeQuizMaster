import React from "react";
import Icon from "../../../public/images/icons/tag.svg";

import { Image, ThemeIcon, ThemeIconProps } from "@mantine/core";

type Props = {
  size?: string;
} & ThemeIconProps;

/** タグアイコン */
export const TagIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="タグアイコン" />
    </ThemeIcon>
  );
};
