import {
  ActionIcon,
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

  // ソートクリック時のハンドラー
  const handleSortClick = (field: string) => {
    onSort(field);
  };

  const examineeRows = examinees.map((examinee) => (
    <Table.Tr key={examinee.id} onClick={drawerOpen}>
      <Table.Td>{examinee.id}</Table.Td>
      <Table.Td>{examinee.name}</Table.Td>
      <Table.Td>
        <Group>
          {examinee.tags.map((tag) => (
            <Pill
              key={tag.name}
              bg={tag.color}
              style={{
                height: rem(30),
                fontSize: theme.fontSizes.xss,
                fontWeight: theme.other.fontWeights.bold,
                padding: `${rem(4)} ${rem(8)}`,
              }}
            >
              {tag.name}
            </Pill>
          ))}
        </Group>
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
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th
            onClick={() => handleSortClick("id")}
            style={{ cursor: "pointer" }}
          >
            受験者ID
          </Table.Th>
          <Table.Th
            onClick={() => handleSortClick("name")}
            style={{ cursor: "pointer" }}
          >
            名前
          </Table.Th>
          <Table.Th
            onClick={() => {
              handleSortClick("tags");
            }}
            style={{ cursor: "pointer" }}
          >
            タグ
          </Table.Th>
          <Table.Th
            onClick={() => handleSortClick("email")}
            style={{ cursor: "pointer" }}
          >
            メールアドレス
          </Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{examineeRows}</Table.Tbody>
    </Table>
  );
};
