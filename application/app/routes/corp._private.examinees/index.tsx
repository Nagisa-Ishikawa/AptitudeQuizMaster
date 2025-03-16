import {
  Center,
  Flex,
  Group,
  Pagination,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ButtonB } from "../../components/Button/ButtonB";
import { ExportIcon } from "../../components/Icon/ExportIcon";
import { ImportIcon } from "../../components/Icon/ImportIcon";
import { Paper } from "../../components/Paper";
import { pages } from "../../consts/pages";
import { RegisterAction } from "./Action";
import { CreateButton } from "./CreateButton";
import { Drawer } from "./Drawer";
import { List } from "./List";
import { fetch, FetchedData } from "./Loader";
import { SearchFilter } from "./SearchFilter";

export default function Index() {
  const data = useLoaderData<FetchedData>();

  const [tagValue, setTagValue] = useState<string[]>([]);
  const [toggleOpened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const totalCount = data.examinees?.length;
  const totalPages = 10; // 仮の値

  return (
    <>
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
            <List drawerOpen={drawerOpen} />
          </Paper>
        </Stack>

        <Center>
          <Pagination total={totalPages} />
        </Center>
      </Stack>

      <Drawer opend={drawerOpened} close={drawerClose} />
    </>
  );
}

export const loader: LoaderFunction = async () => {
  return await fetch();
};

export const action: ActionFunction = async ({ request }) => {
  const now = new Date();
  const formData = await request.formData();

  switch (request.method) {
    case "POST":
      await RegisterAction(formData, now);
  }
  return redirect(pages.corpExaminees.path);
};
