import { Image, ThemeIcon } from "@mantine/core";
import React from "react";

type IconProps = {
  iconPath: string;
  size?: string;
  alt?: string;
  [key: string]: unknown;
};

export const IconComponent: React.FC<IconProps> = ({
  iconPath,
  size,
  alt,
  ...props
}) => {
  return (
    <ThemeIcon size={size} {...props}>
      <Image w={size} h={size} src={iconPath} alt={alt} />
    </ThemeIcon>
  );
};
