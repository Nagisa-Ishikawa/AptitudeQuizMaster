import React from "react";
import FilledIcon from "../../../public/images/icons/star.svg";
import OutlineIcon from "../../../public/images/icons/star_outline.svg";
import { Icon } from "./Icon";

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
    <Icon
      size={size}
      iconPath={isStarred ? FilledIcon : OutlineIcon}
      alt={isStarred ? "星アイコン" : "星アイコン（アウトライン）"}
      {...props}
    />
  );
};
