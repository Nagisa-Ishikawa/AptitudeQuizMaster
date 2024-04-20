import React from "react";
import OnIcon from "../../../public/images/icons/visibility_on.svg";
import OffIcon from "../../../public/images/icons/visibility_off.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  /**
   * trueで表示時アイコン、falseで非表示時アイコン
   */
  isVisible: boolean;
  size?: string;
  [key: string]: unknown;
};

/** 表示・非表示マークアイコン */
export const VisibilityIcon: React.FC<Props> = ({
  isVisible,
  size,
  ...props
}: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image
        w={size}
        h={size}
        src={isVisible ? OnIcon : OffIcon}
        alt={isVisible ? "表示マークアイコン" : "非表示マークアイコン"}
      />
    </ThemeIcon>
  );
};
