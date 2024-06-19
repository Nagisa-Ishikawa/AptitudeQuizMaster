import { ThemeIcon, Image } from "@mantine/core";
import React from "react";
import Icon from "../../../public/images/icons/edit.svg";

type Props = {
  size?: string;
  [key: string]: unknown;
};

/** 編集のペンマークアイコン */
export const EditIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon {...props}>
      <Image w={size} h={size} src={Icon} alt="ハッシュアイコン" />
    </ThemeIcon>
  );
};
