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
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { ButtonB } from "../../components/Button/ButtonB";
import { ExportIcon } from "../../components/Icon/ExportIcon";
import { ImportIcon } from "../../components/Icon/ImportIcon";
import { Paper } from "../../components/Paper";
import { prisma } from "../../services/db.server";
import { ExamineeTable } from "./ExamineeTable";
import { SearchFilter } from "./SearchFilter";

export type ExamineeData = {
  name: string;
  id: number;
  email: string;
  password: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  tags: string[];
};

export default function Index() {
  const examinees = useLoaderData<ExamineeData[]>();

  const [tagValue, setTagValue] = useState<string[]>([]);
  const [toggleOpened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const totalCount = examinees.length;
  const totalPages = 10; // 仮の値

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
            <ButtonA>追加</ButtonA>
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
            examineeTag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const examineesData = examinees.map((examinee) => {
      return {
        ...examinee,
        tags: examinee.ExamineeTagging.map(
          (tagging) => tagging.examineeTag.name
        ).join(", "),
      };
    });

    return json(examineesData);
  } catch (error) {
    console.error(error);
    throw new Error("データを取得できませんでした");
  }
};
