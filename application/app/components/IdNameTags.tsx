import { Box, Flex, Group, Pill, rem, useMantineTheme } from "@mantine/core";
import React from "react";
import { IdBadge } from "./Badge/IdBadge";

type Props = {
  item: { id: number; title: string; tags: { name: string; color: string }[] };
};

/**
 * id, 名前, タグを表示するコンポーネント
 */
export const IdNameTags: React.FC<Props> = ({ item }: Props) => {
  const theme = useMantineTheme();

  return (
    <Group align="center" gap={rem(8)}>
      <IdBadge value={item.id} />
      <Box style={{ fontWeight: theme.other.fontWeights.bold }}>
        {item.title}
      </Box>
      <Flex
        style={{
          gap: rem(8),
          fontSize: theme.fontSizes.xsss,
          fontWeight: theme.other.fontWeights.bold,
        }}
      >
        {item.tags.map((tag, i) => (
          <Pill key={i} bg={tag.color}>
            {tag.name}
          </Pill>
        ))}
      </Flex>
    </Group>
  );
};
