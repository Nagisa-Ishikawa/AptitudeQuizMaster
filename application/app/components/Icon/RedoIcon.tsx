import React from "react";
import Icon from "../../../public/images/icons/redo.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** リドゥアイコン */
export const RedoIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="リドゥアイコン" />
    </ThemeIcon>
  );
};
