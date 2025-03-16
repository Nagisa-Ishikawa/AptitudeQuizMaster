import { Group, Pill, rem, Table, Text, useMantineTheme } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";

import { IdBadge } from "../../components/Badge/IdBadge";
import { AddIcon } from "../../components/Icon/AddIcon";
import { RedoIcon } from "../../components/Icon/RedoIcon";
import { DeleteButton } from "./DeleteButton";
import { FetchedData } from "./Loader";
import { UpdateButton } from "./UpdateButton";

type Props = {
  drawerOpen: () => void;
};

export const List = ({ drawerOpen }: Props) => {
  const data = useLoaderData<FetchedData>();
  const theme = useMantineTheme();

  return (
    <Table
      highlightOnHover
      verticalSpacing={rem(20)}
      horizontalSpacing={rem(16)}
      styles={{
        th: {
          color:
            theme.colors.tableHeaderTextColor[theme.primaryShade as number],
          border: rem(1),
          borderBottomStyle: "solid",
          borderBottomColor:
            theme.colors.secondaryColorPallet[theme.primaryShade as number],
        },
        tr: {
          borderBottom: `dashed 
          ${rem(1)} 
          ${theme.colors.secondaryColorPallet[theme.primaryShade as number]}`,
        },
      }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th w={rem(100)}>受験者ID</Table.Th>
          <Table.Th>名前</Table.Th>
          <Table.Th>タグ</Table.Th>
          <Table.Th>メールアドレス</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {data.examinees.map((examinee) => (
          <Table.Tr key={examinee.id} onClick={drawerOpen}>
            <Table.Td align="center">
              <IdBadge value={examinee.id} />
            </Table.Td>
            <Table.Td>
              <Text
                style={{
                  fontWeight: theme.other.fontWeights.bold,
                  maxWidth: rem(200),
                }}
                truncate="end"
              >
                {examinee.name}
              </Text>
            </Table.Td>
            <Table.Td>
              <Pill.Group>
                {examinee.tags.map((x) => (
                  <Pill
                    key={x.name}
                    bg={x.color}
                    style={{
                      height: rem(30),
                      fontSize: theme.fontSizes.sm,
                      fontWeight: theme.other.fontWeights.bold,
                      padding: `${rem(4)} ${rem(16)}`,
                    }}
                  >
                    {x.name}
                  </Pill>
                ))}
              </Pill.Group>
            </Table.Td>
            <Table.Td>{examinee.email}</Table.Td>
            <Table.Td>
              <Group
                gap={rem(32)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <RedoIcon size={rem(24)} />
                <AddIcon size={rem(24)} />
                <UpdateButton id={examinee.id} />
                <DeleteButton id={examinee.id} />
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
