import {
  Box,
  CheckIcon,
  Group,
  InputWrapperProps,
  rem,
  Select,
  SelectProps,
  useMantineTheme,
} from "@mantine/core";
import React, { ComponentProps } from "react";
import { IdBadge } from "../../Badge/IdBadge";

type Props = {
  options: {
    id: number;
    title: string;
    tags: { name: string; color: string }[];
  }[];
} & InputWrapperProps &
  ComponentProps<typeof Select>;

export const IdNameTagsSelect: React.FC<Props> = ({ options, ...props }) => {
  const theme = useMantineTheme();

  const renderSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }) => {
    const item = options.find((x) => x.id === Number(option.label));

    if (!item) return <></>;

    return (
      <Group align="center" gap={rem(8)} w="100%">
        <IdBadge value={item.id} />
        <Box style={{ fontWeight: theme.other.fontWeights.bold }}>
          {item.title}
        </Box>
        {checked && <CheckIcon style={{ marginLeft: "auto" }} size={rem(10)} />}
      </Group>
    );
  };

  return (
    <Select
      data={options?.map((x) => x.id.toString())}
      renderOption={renderSelectOption}
      clearable
      placeholder={props.label ? `${props.label}を入力してください` : undefined}
      styles={{
        label: {
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.other.fontWeights.bold,
          marginBottom: rem(4),
        },
        input: { padding: rem(10), height: rem(48) },
      }}
      {...props}
    ></Select>
  );
};
