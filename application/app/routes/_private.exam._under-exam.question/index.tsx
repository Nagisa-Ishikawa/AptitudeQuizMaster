import { Flex, Space, Stack, Title, rem, useMantineTheme } from "@mantine/core";

/** 問題一覧ページ */
export default function Index() {
  const theme = useMantineTheme();

  return (
    <Stack w={"100%"}>
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
      </Flex>
      <Space h={rem(20)} />

      {/* 問題一覧 */}
      <Flex justify="center"></Flex>
    </Stack>
  );
}
