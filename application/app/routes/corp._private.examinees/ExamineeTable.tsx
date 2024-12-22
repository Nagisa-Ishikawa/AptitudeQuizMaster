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
};

export const ExamineeTable = ({
  examinees,
  drawerOpen,
}: ExamineeTableProps) => {
  const theme = useMantineTheme();
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
          <Table.Th>受験者ID</Table.Th>
          <Table.Th>名前</Table.Th>
          <Table.Th>タグ</Table.Th>
          <Table.Th>メールアドレス</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{examineeRows}</Table.Tbody>
    </Table>
  );
};
