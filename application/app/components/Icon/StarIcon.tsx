import React from "react";
import FilledIcon from "../../../public/images/icons/star.svg";
import OutlineIcon from "../../../public/images/icons/star_outline.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  isStarred?: boolean;
  size?: string;
  [key: string]: unknown;
};

/** 星アイコン */
export const StarIcon: React.FC<Props> = ({
  isStarred = true,
  size,
  ...props
}: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image
        w={size}
        h={size}
        src={isStarred ? FilledIcon : OutlineIcon}
        alt={isStarred ? "星アイコン" : "星アイコン（アウトライン）"}
      />
    </ThemeIcon>
  );
};
