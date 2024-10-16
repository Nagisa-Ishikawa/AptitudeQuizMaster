import { TagsInput, TagsInputProps } from "@mantine/core";
import React from "react";

type Props = {
  defaultOption: string[];
} & TagsInputProps;

export const TagCreatebleSelector: React.FC<Props> = ({
  defaultOption,
  ...props
}: Props) => {
  return <TagsInput data={defaultOption} {...props} />;
};
