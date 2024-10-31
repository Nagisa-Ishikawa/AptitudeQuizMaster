import React from "react";
import Icon from "../../../public/images/icons/file_download.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** インポートアイコン */
export const ImportIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="インポートアイコン" />
    </ThemeIcon>
  );
};
