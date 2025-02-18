import { Group, rem, Table } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { FetchedData } from ".";
import { AddIcon } from "../../components/Icon/AddIcon";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";
import { RedoIcon } from "../../components/Icon/RedoIcon";
import { UpdateButton } from "./UpdateButton";

type Props = {
  drawerOpen: () => void;
};

export const List = ({ drawerOpen }: Props) => {
  const data = useLoaderData<FetchedData>();

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

      <Table.Tbody>
        {data.examinees.map((examinee) => (
          <Table.Tr key={examinee.id} onClick={drawerOpen}>
            <Table.Td>{examinee.id}</Table.Td>
            <Table.Td>{examinee.name}</Table.Td>
            <Table.Td>タグ</Table.Td>
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
                <DeleteIcon size={rem(24)} />
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
