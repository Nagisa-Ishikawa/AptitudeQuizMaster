import {
  Box,
  Flex,
  ThemeIcon,
  Image,
  rem,
  useMantineTheme,
  Space,
} from "@mantine/core";
import React from "react";
import { Legend } from "./Legend";
import StarIcon from "../../../public/images/icons/star.svg";

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
                border: "2px solid",
                borderColor:
                  theme.colors.secondaryColor[theme.primaryShade as number],
                borderRadius: "6px",
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
                borderRadius: "6px",
              }}
            ></Box>
            <Space h={rem(6)} />
          </>
        }
      />
      <Legend
        label={"後で見返す"}
        sample={
          <ThemeIcon size={rem(22)}>
            <Image src={StarIcon} alt="スターアイコン" />
          </ThemeIcon>
        }
      />
    </Flex>
  );
};
