import React from "react";
import Icon from "../../../public/images/icons/mail.svg";

import { Image, ThemeIcon, ThemeIconProps } from "@mantine/core";

type Props = {
  size?: string;
} & ThemeIconProps;

/** メールアイコン */
export const MailIcon: React.FC<Props> = ({ size, ...props }: Props) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={Icon} alt="メールアイコン" />
    </ThemeIcon>
  );
};
