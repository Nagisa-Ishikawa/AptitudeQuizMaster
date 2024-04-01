import { Flex, Space, Stack, Title, rem, useMantineTheme } from "@mantine/core";

import { TimeLeft } from "./TimeLeft";
import { BackLink } from "./BackLink";
import { Legends } from "./Legends";
import { Questions } from "./Questions";

/** 問題一覧ページ */
export default function Index() {
  const theme = useMantineTheme();

  return (
    <Stack w={"100%"} style={{ padding: "30px 80px 40px 80px" }} gap="24px">
      <Flex align="center" justify="space-between">
        {/* 問題に戻るリンク */}
        <BackLink />
        {/* 残り時間 */}
        <TimeLeft timeLeft={20} timeLeftLabel="02:23" />
      </Flex>
      <Flex
        style={{
          paddingBottom: rem(8),
          borderBottom: "1px solid",
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
