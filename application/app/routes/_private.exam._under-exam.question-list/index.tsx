import { Flex, Space, Stack, Title, rem, useMantineTheme } from "@mantine/core";

import { Legends } from "./Legends";
import { Questions } from "./Questions";

/** 問題一覧ページ */
export default function Index() {
  const theme = useMantineTheme();

  return (
    <Stack w={"100%"} gap={rem(24)}>
      <Flex
        style={{
          paddingBottom: rem(8),
          borderBottom: `${rem(1)} solid`,
          borderColor:
            theme.colors.secondaryColor[theme.primaryShade as number],
        }}
        justify="space-between"
      >
        <Title>問題一覧</Title>
        {/* 解答状態凡例 */}
        <Legends />
      </Flex>
      <Space h={rem(20)} />

      {/* 問題一覧 */}
      <Flex justify="center">
        <Questions />
      </Flex>
    </Stack>
  );
}
