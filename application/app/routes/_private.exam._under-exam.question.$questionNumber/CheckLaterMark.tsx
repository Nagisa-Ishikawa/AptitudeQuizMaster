import { Flex, rem, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { StarIcon } from "../../components/Icon/StarIcon";
import { useOutletContext } from "@remix-run/react";
import { FetchedData } from "../_private.exam";

export const CheckLaterMark: React.FC = () => {
  const data = useOutletContext() as FetchedData;
  const theme = useMantineTheme();
  return (
    <Flex align="center" gap={rem(2)}>
      <StarIcon isStarred={false} />
      <Text
        style={{
          fontWeight: theme.other.fontWeights.bold,
          fontSize: theme.fontSizes.sm,
        }}
      >
        後で見返す
      </Text>
    </Flex>
  );
};
