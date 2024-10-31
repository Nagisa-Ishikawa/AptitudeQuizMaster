import React from "react";
import Icon from "../../../public/images/icons/edit.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** エディットアイコン */
export const EditIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="エディットアイコン" />
    </ThemeIcon>
  );
};
