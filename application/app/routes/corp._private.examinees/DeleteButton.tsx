import { rem, useMantineTheme } from "@mantine/core";
import React from "react";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";

type Props = {};

export const DeleteButton: React.FC<Props> = ({}) => {
  const theme = useMantineTheme();
  return (
    <>
      <DeleteIcon size={rem(24)} />
    </>
  );
};
