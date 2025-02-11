import {
  ActionIcon,
  Box,
  Center,
  Group,
  Pill,
  rem,
  Table,
  useMantineTheme,
} from "@mantine/core";
import { ExamineeData } from ".";
import { AddIcon } from "../../components/Icon/AddIcon";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";
import { EditIcon } from "../../components/Icon/EditIcon";
import { RedoIcon } from "../../components/Icon/RedoIcon";
import { Tag } from "../../components/Tag/Tag";

type ExamineeTableProps = {
  examinees: ExamineeData[];
  drawerOpen: () => void;
  onSort: (field: string) => void;
};

export const ExamineeTable = ({
  examinees,
  drawerOpen,
  onSort,
}: ExamineeTableProps) => {
  const theme = useMantineTheme();

  const headerStyle = {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.other.fontWeights.bold,
    color: theme.colors.lightTextColor[6],
    cursor: "pointer",
  };

  const bodyStyle = {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.other.fontWeights.normal,
    lineHight: rem(36),
    color: theme.colors.textColor[6],
  };

  // ソートクリック時のハンドラー
  const handleSortClick = (field: string) => {
    onSort(field);
  };

  const examineeRows = examinees.map((examinee) => (
    <Table.Tr
      key={examinee.id}
      onClick={drawerOpen}
      style={{
        borderBottom: `${rem(1)} dashed ${theme.colors.secondaryColor[6]}`,
      }}
    >
      <Table.Td>
        <Center>
          <Box
            w={"fit-content"}
            h={"fit-content"}
            px={rem(8)}
            lh={rem(28)}
            style={{
              border: `${rem(1)} solid ${theme.colors.secondaryColor[6]}`,
              borderRadius: rem(100),
            }}
          >
            {examinee.id}
          </Box>
        </Center>
      </Table.Td>
      <Table.Td fw={theme.other.fontWeights.bold}>{examinee.name}</Table.Td>
      <Table.Td>
        {examinee.tags && examinee.tags.length > 0 && (
          <Pill.Group gap={rem(8)}>
            {examinee.tags.map((tag) => (
              <Tag key={tag.name} tag={tag} />
            ))}
          </Pill.Group>
        )}
      </Table.Td>
      <Table.Td>{examinee.email}</Table.Td>
      <Table.Td>
        <Group gap={rem(32)}>
          {[RedoIcon, AddIcon, EditIcon, DeleteIcon].map(
            (IconComponent, index) => (
              <ActionIcon key={index} variant="transparent" size={rem(24)}>
                <IconComponent size={rem(24)} />
              </ActionIcon>
            )
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={rem(800)}>
      <Table highlightOnHover stickyHeader verticalSpacing={rem(16)}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              onClick={() => handleSortClick("id")}
              style={{ ...headerStyle, textAlign: "center" }}
            >
              受験者ID
            </Table.Th>
            <Table.Th
              onClick={() => handleSortClick("name")}
              style={headerStyle}
            >
              名前
            </Table.Th>
            <Table.Th
              onClick={() => {
                handleSortClick("tags");
              }}
              style={headerStyle}
            >
              タグ
            </Table.Th>
            <Table.Th
              onClick={() => handleSortClick("email")}
              style={headerStyle}
            >
              メールアドレス
            </Table.Th>
            <Table.Th></Table.Th> {/* ボタングループ用の空列 */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody style={bodyStyle}>{examineeRows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
