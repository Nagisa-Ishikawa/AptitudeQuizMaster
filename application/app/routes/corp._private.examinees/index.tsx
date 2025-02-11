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
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, usePagination } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { SquareButton } from "../../components/Button/SquareButton";
import { ExportIcon } from "../../components/Icon/ExportIcon";
import { ImportIcon } from "../../components/Icon/ImportIcon";
import { Paper } from "../../components/Paper";
import { Item } from "../../components/Tag/TagsInput";
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
  tags: Item[];
};

type LoaderData = {
  examinees: ExamineeData[];
  totalCount: number;
  tagOptions: Item[];
};

export type sortDirectionType = "asc" | "desc";

export default function Index() {
  const { examinees, totalCount, tagOptions } = useLoaderData<LoaderData>();
  const theme = useMantineTheme();

  const [searchParams] = useSearchParams();
  const examineeIdParam = searchParams.get("examineeId") || "";
  const nameOrEmailParam = searchParams.get("nameOrEmail") || "";
  const [tagValue, setTagValue] = useState<Item[]>([]);
  const sortField = searchParams.get("sortField") || "id";
  const sortDirection =
    (searchParams.get("sortDirection") as sortDirectionType) || "desc";

  const [toggleOpened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const currentPageParam = searchParams.get("page");
  const currentPage = currentPageParam ? parseInt(currentPageParam, 10) : 1;
  const totalPages = Math.ceil(totalCount / PAGINATION_UNIT);
  const navigate = useNavigate();

  const handlePageChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    navigate(`?${params.toString()}`);
  };

  const pagination = usePagination({
    total: totalPages,
    page: currentPage,
    onChange: (page) => handlePageChange(page),
  });

  const handleSort = (field: string) => {
    let direction: "asc" | "desc" = "desc";
    if (field === sortField) {
      direction = sortDirection === "asc" ? "desc" : "asc";
    }
    const params = new URLSearchParams(searchParams);
    params.set("sortField", field);
    params.set("sortDirection", direction);
    params.set("page", "1");
    navigate(`?${params.toString()}`);
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
          <Group gap={rem(16)}>
            <Group gap={rem(8)}>
              <SquareButton
                leftSection={<ImportIcon size={rem(24)} />}
                onClick={() => {
                  alert("インポートボタンがクリックされました");
                }}
              >
                インポート
              </SquareButton>
              <SquareButton
                leftSection={<ExportIcon size={rem(24)} />}
                onClick={() => {
                  alert("エクスポートボタンがクリックされました");
                }}
              >
                エクスポート
              </SquareButton>
            </Group>
            <ButtonA
              size={"lg"}
              w={rem(256)}
              h={rem(60)}
              onClick={() => {
                alert("追加ボタンがクリックされました");
              }}
            >
              追加
            </ButtonA>
          </Group>
        </Flex>

        <SearchFilter
          toggleOpened={toggleOpened}
          toggle={toggle}
          tagValue={tagValue}
          setTagValue={setTagValue}
          examineeId={examineeIdParam}
          nameOrEmail={nameOrEmailParam}
          tagOptions={tagOptions}
        />

        <Stack gap={rem(8)}>
          <Flex justify={"space-between"} align={"center"}>
            <Title size={rem(24)}>受験者一覧</Title>
            <Text
              c={theme.colors.lightTextColor[6]}
              fs={theme.fontSizes.sm}
              fw={theme.other.fontWeights.bold}
            >
              全{totalCount}件
            </Text>
          </Flex>
          <Paper>
            <ExamineeTable
              examinees={examinees}
              drawerOpen={drawerOpen}
              onSort={handleSort}
            />
          </Paper>
        </Stack>

        <Center>
          <Pagination
            total={totalPages}
            value={pagination.active}
            onChange={pagination.setPage}
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

  const examineeIdParam = url.searchParams.get("examineeId");
  const nameOrEmailParam = url.searchParams.get("nameOrEmail");
  const tagsParam = url.searchParams
    .getAll("tags")
    .filter((tags) => tags !== "");
  const sortFieldParam = url.searchParams.get("sortField") || "id";
  const sortDirectionParam =
    (url.searchParams.get("sortDirection") as sortDirectionType) || "desc";

  let whereClause: Prisma.ExamineeWhereInput = {
    deletedAt: null,
  };

  if (examineeIdParam) {
    const examineeId = parseInt(examineeIdParam);
    if (!isNaN(examineeId)) {
      whereClause = {
        ...whereClause,
        id: examineeId,
      };
    }
  }

  if (nameOrEmailParam) {
    const nameOrEmail = nameOrEmailParam;
    whereClause = {
      ...whereClause,
      OR: [
        {
          name: {
            contains: nameOrEmail,
          },
        },
        {
          email: {
            contains: nameOrEmail,
          },
        },
      ],
    };
  }

  if (tagsParam && tagsParam.length > 0) {
    whereClause = {
      ...whereClause,
      ExamineeTagging: {
        some: {
          deletedAt: null,
          examineeTag: {
            name: {
              in: tagsParam,
            },
          },
        },
      },
    };
  }

  const orderByClause: Prisma.ExamineeOrderByWithRelationInput =
    sortFieldParam === "tags"
      ? {}
      : {
          [sortFieldParam]: sortDirectionParam,
        };

  try {
    const [examinees, totalCount, allTagOptions] = await Promise.all([
      prisma.examinee.findMany({
        where: whereClause,
        include: {
          ExamineeTagging: {
            where: {
              deletedAt: null,
            },
            include: {
              examineeTag: {
                select: {
                  name: true,
                  color: true,
                },
              },
            },
          },
        },
        orderBy: orderByClause,
      }),
      prisma.examinee.count({
        where: whereClause,
      }),
      prisma.examineeTag.findMany({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    const examineesData = examinees.map((examinee) => {
      const tagIds = examinee.ExamineeTagging.map(
        (tagging) => tagging.examineeTagId
      ).sort((a, b) => a - b);

      return {
        ...examinee,
        tags: examinee.ExamineeTagging.map((tagging) => ({
          id: tagging.examineeTagId,
          name: tagging.examineeTag.name,
          color: tagging.examineeTag.color || undefined,
        })),
        tagIdsString: JSON.stringify(tagIds),
      };
    });

    // tagでソートの場合のみ、後でソートする
    if (sortFieldParam === "tags") {
      examineesData.sort((a, b) => {
        if (sortDirectionParam === "asc") {
          return a.tagIdsString.localeCompare(b.tagIdsString);
        } else {
          return b.tagIdsString.localeCompare(a.tagIdsString);
        }
      });
    }

    // ページネーション
    const examineesDataPaginated = examineesData.slice(
      offset,
      offset + PAGINATION_UNIT
    );

    const tagOptions: Item[] = allTagOptions.map((tag) => ({
      name: tag.name,
      color: tag.color || undefined,
    }));

    return json({ examinees: examineesDataPaginated, totalCount, tagOptions });
  } catch (error) {
    console.error(error);
    throw new Error("データを取得できませんでした");
  }
};
