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
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { ButtonB } from "../../components/Button/ButtonB";
import { ExportIcon } from "../../components/Icon/ExportIcon";
import { ImportIcon } from "../../components/Icon/ImportIcon";
import { Paper } from "../../components/Paper";
import { prisma } from "../../services/db.server";
import { ExamineeTable } from "./ExamineeTable";
import { SearchFilter } from "./SearchFilter";

const PAGINATION_UNIT = 30;

export type ExamineeData = {
  id: number;
  name: string;
  email: string;
  password: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  tags: string[];
};

type LoaderData = {
  examinees: ExamineeData[];
  totalCount: number;
};

export default function Index() {
  const { examinees, totalCount } = useLoaderData<LoaderData>();

  const [tagValue, setTagValue] = useState<string[]>([]);
  const [toggleOpened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);
  const [searchParams] = useSearchParams();
  const currentPageParam = searchParams.get("page");
  const currentPage = currentPageParam ? parseInt(currentPageParam, 10) : 1;
  const totalPages = Math.ceil(totalCount / PAGINATION_UNIT);
  const navigate = useNavigate();

  const handlePageChange = (value: number) => {
    navigate(`?page=${value}`);
  };

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
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </Center>
      </Stack>
    </>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const offset = (page - 1) * PAGINATION_UNIT;

  try {
    const [examinees, totalCount] = await Promise.all([
      prisma.examinee.findMany({
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
        skip: offset,
        take: PAGINATION_UNIT,
      }),
      prisma.examinee.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    const examineesData = examinees.map((examinee) => {
      return {
        ...examinee,
        tags: examinee.ExamineeTagging.map(
          (tagging) => tagging.examineeTag.name
        ).join(", "),
      };
    });

    return json({ examinees: examineesData, totalCount });
  } catch (error) {
    console.error(error);
    throw new Error("データを取得できませんでした");
  }
};
