import { ActionIcon, Group, rem, Table } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { FetchedData } from ".";
import { AddIcon } from "../../components/Icon/AddIcon";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";
import { EditIcon } from "../../components/Icon/EditIcon";
import { RedoIcon } from "../../components/Icon/RedoIcon";

type Props = {
  drawerOpen: () => void;
};

export const ExamineeTable = ({ drawerOpen }: Props) => {
  const data = useLoaderData<FetchedData>();

  const examineeRows = data.examinees.map((examinee) => (
    <Table.Tr key={examinee.id} onClick={drawerOpen}>
      <Table.Td>{examinee.id}</Table.Td>
      <Table.Td>{examinee.name}</Table.Td>
      <Table.Td>タグ</Table.Td>
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
