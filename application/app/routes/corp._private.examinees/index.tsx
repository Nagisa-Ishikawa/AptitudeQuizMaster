import {
  ActionIcon,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Group,
  NumberInput,
  Pagination,
  rem,
  Stack,
  Table,
  TagsInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Exam, Examinee, ExamineeTag, ExamTag } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ButtonB } from "../../components/Button/ButtonB";
import { AddIcon } from "../../components/Icon/AddIcon";
import { ArrowDownIcon } from "../../components/Icon/ArrowDownIcon";
import { ArrowUpIcon } from "../../components/Icon/ArrowUpIcon";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";
import { EditIcon } from "../../components/Icon/EditIcon";
import { ExportIcon } from "../../components/Icon/ExportIcon";
import { FilterIcon } from "../../components/Icon/FilterIcon";
import { ImportIcon } from "../../components/Icon/ImportIcon";
import { RedoIcon } from "../../components/Icon/RedoIcon";
import { PaperA } from "../../components/Paper/PaperA";
import { pages } from "../../consts/pages";
import { prisma } from "../../services/db.server";
import { CreateExaminee } from "./Create";
import { CreateButton } from "./CreateButton";

export type FetchedData = {
  examinees: LinkedExaminee[];
  tagsMaster: ExamineeTag[];
  examsMaster: LinkedExam[];
};

export type LinkedExaminee = Examinee & {
  tags: ExamineeTag[];
  exams: Exam[];
};

export type LinkedExam = Exam & {
  tags: ExamTag[];
};

export default function Index() {
  const data = useLoaderData<FetchedData>();

  const [tagValue, setTagValue] = useState<string[]>([]);
  const [toggleOpened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const totalCount = data.examinees?.length;
  const totalPages = 10; // 仮の値

  const rows = data.examinees.map((examinee) => (
    <Table.Tr key={examinee.id} onClick={drawerOpen}>
      <Table.Td>{examinee.id}</Table.Td>
      <Table.Td>{examinee.name}</Table.Td>
      <Table.Td>tag</Table.Td>
      <Table.Td>{examinee.email}</Table.Td>
      <Table.Td>
        <Group gap={rem(32)}>
          <ActionIcon
            variant={"transparent"}
            size={rem(24)}
            aria-label={"redo icon"}
          >
            <RedoIcon size={rem(24)} />
          </ActionIcon>
          <ActionIcon
            variant={"transparent"}
            size={rem(24)}
            aria-label={"add icon"}
          >
            <AddIcon size={rem(24)} />
          </ActionIcon>
          <ActionIcon
            variant={"transparent"}
            size={rem(24)}
            aria-label={"edit icon"}
          >
            <EditIcon size={rem(24)} />
          </ActionIcon>
          <ActionIcon
            variant={"transparent"}
            size={rem(24)}
            aria-label={"delete icon"}
          >
            <DeleteIcon size={rem(24)} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={drawerClose}
        position="bottom"
        withCloseButton={false}
      >
        {/* ドロワーの中身を書く */}
      </Drawer>

      <Stack bg={"#EEF2F8"} p={rem(40)} gap={rem(32)}>
        <Flex justify={"space-between"} align={"center"}>
          <Title order={1}>受験者</Title>
          <Group>
            <ButtonB leftSection={<ImportIcon size={rem(24)} />}>
              インポート
            </ButtonB>
            <ButtonB leftSection={<ExportIcon size={rem(24)} />}>
              エクスポート
            </ButtonB>
            {/* 受験者追加ボタン・追加機能 */}
            <CreateButton />
          </Group>
        </Flex>
        <Stack bg={"white"} p={(rem(32), rem(40))} gap={rem(32)}>
          <Flex
            justify={"space-between"}
            component={"a"}
            variant={"transparent"}
            onClick={toggle}
          >
            <Group gap={rem(8)} align={"center"}>
              <FilterIcon />
              検索フィルター
            </Group>
            {toggleOpened ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </Flex>
          <Collapse in={toggleOpened}>
            <Stack gap={rem(32)}>
              <Stack gap={rem(8)}>
                <Flex gap={rem(16)}>
                  <NumberInput
                    label="受験者ID"
                    placeholder="受験者IDを入力してください"
                    flex={1}
                    hideControls
                  />
                  <TextInput
                    label="名前 or メールアドレス"
                    placeholder="名前 or メールアドレス"
                    flex={1}
                  />
                </Flex>
                <TagsInput
                  label="タグ"
                  data={[]}
                  value={tagValue}
                  onChange={setTagValue}
                />
              </Stack>
              <Center>
                <Button>検索</Button>
              </Center>
            </Stack>
          </Collapse>
          <Collapse in={!toggleOpened}>
            <Flex justify={"flex-start"} align={"center"} gap={rem(32)}>
              <Stack gap={rem(0)}>
                <Text>受験者ID</Text>
                <Text>000</Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={rem(0)}>
                <Text>名前 or メールアドレス</Text>
                <Text>青山あかね</Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={rem(0)}>
                <Text>タグ</Text>
                <Text>タグ1, タグ2</Text>
              </Stack>
            </Flex>
          </Collapse>
        </Stack>

        <Stack gap={rem(8)}>
          <Flex justify={"space-between"} align={"center"}>
            <Title size={rem(24)}>受験者一覧</Title>
            <Text>全{totalCount}件</Text>
          </Flex>
          <PaperA>
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
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </PaperA>
        </Stack>

        <Center>
          <Pagination total={totalPages} />
        </Center>
      </Stack>
    </>
  );
}

export const loader: LoaderFunction = async () => {
  try {
    const examinees = await prisma.examinee.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        ExamineeTagging: {
          where: {
            deletedAt: null,
          },
          include: {
            examineeTag: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const tagsMaster = await prisma.examineeTag.findMany({
      where: { deletedAt: null },
    });
    const examsMaster = await prisma.exam.findMany({
      where: { deletedAt: null },
      include: {
        ExamTagging: {
          where: {
            deletedAt: null,
          },
          include: {
            examTag: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const data = {
      examinees: examinees?.map((examinee) => {
        return {
          ...examinee,
          tags: examinee.ExamineeTagging?.map((tagging) => tagging.examineeTag),
        };
      }),
      tagsMaster: tagsMaster,
      examsMaster: examsMaster?.map((exam) => {
        return {
          ...exam,
          tags: exam.ExamTagging?.map((tagging) => tagging.examTag),
        };
      }),
    };

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("データを取得できませんでした");
  }
};

export const action: ActionFunction = async ({ request }) => {
  const now = new Date();
  const formData = await request.formData();
  switch (request.method) {
    case "POST": {
      CreateExaminee(formData, now);
    }
  }
  return redirect(pages.corpExaminees.path);
};
