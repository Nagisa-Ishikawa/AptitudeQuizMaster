import React from "react";
import Icon from "../../../public/images/icons/exam.svg";

import { Image, ThemeIcon } from "@mantine/core";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** 試験アイコン */
export const ExamIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="試験アイコン" />
    </ThemeIcon>
  );
};
