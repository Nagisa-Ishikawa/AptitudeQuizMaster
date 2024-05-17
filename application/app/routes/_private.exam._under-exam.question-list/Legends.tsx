import { Box, Flex, rem, useMantineTheme, Space } from "@mantine/core";
import React from "react";
import { Legend } from "./Legend";
import { StarIcon } from "../../components/Icon/StarIcon";

// 解答状態凡例
export const Legends: React.FC = () => {
  const theme = useMantineTheme();
  return (
    <Flex align="flex-end">
      <Legend
        label={"未解答"}
        sample={
          <>
            <Box
              h={rem(15)}
              w={rem(15)}
              style={{
                border: `${rem(2)} solid`,
                borderColor:
                  theme.colors.secondaryColor[theme.primaryShade as number],
                borderRadius: rem(6),
              }}
            ></Box>
            <Space h={rem(6)} />
          </>
        }
      />
      <Legend
        label={"解答済"}
        sample={
          <>
            <Box
              h={rem(15)}
              w={rem(15)}
              bg={theme.colors.secondaryColor[theme.primaryShade as number]}
              style={{
                borderRadius: rem(6),
              }}
            ></Box>
            <Space h={rem(6)} />
          </>
        }
      />
      <Legend label={"後で見返す"} sample={<StarIcon size={rem(22)} />} />
    </Flex>
  );
};
