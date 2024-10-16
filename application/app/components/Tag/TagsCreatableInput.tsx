import { TagsInput, TagsInputProps } from "@mantine/core";
import React from "react";

type Props = {
  ref: React.RefObject<HTMLInputElement>;
  defaultOption: OptionProps[];
} & TagsInputProps;

type OptionProps = {
  value: string;
};

export const TagSelector: React.FC<Props> = ({
  ref,
  defaultOption,
  ...props
}: Props) => {
  return (
    <TagsInput
      ref={ref}
      data={defaultOption.map((x) => x.value)}
      splitChars={[",", " ", "|"]}
      clearable
      {...props}
    />
  );
};
