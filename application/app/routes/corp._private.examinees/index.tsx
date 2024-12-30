import {
  Center,
  Drawer,
  Flex,
  Group,
  Pagination,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Exam, Examinee, ExamineeTag, ExamTag } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ButtonB } from "../../components/Button/ButtonB";
import { ExportIcon } from "../../components/Icon/ExportIcon";
import { ImportIcon } from "../../components/Icon/ImportIcon";
import { Paper } from "../../components/Paper";
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
        <SearchFilter
          toggleOpened={toggleOpened}
          toggle={toggle}
          tagValue={tagValue}
          setTagValue={setTagValue}
        />

        <Stack gap={rem(8)}>
          <Flex justify={"space-between"} align={"center"}>
            <Title size={rem(24)}>受験者一覧</Title>
            <Text>全{totalCount}件</Text>
          </Flex>
          <Paper>
            <ExamineeTable examinees={examinees} drawerOpen={drawerOpen} />
          </Paper>
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
