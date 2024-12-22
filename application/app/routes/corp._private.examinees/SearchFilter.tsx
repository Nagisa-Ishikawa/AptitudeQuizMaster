import {
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Form } from "@remix-run/react";
import { ArrowDownIcon } from "../../components/Icon/ArrowDownIcon";
import { ArrowUpIcon } from "../../components/Icon/ArrowUpIcon";
import { FilterIcon } from "../../components/Icon/FilterIcon";
import { Item, TagsInput } from "../../components/Tag/TagsInput";

type SearchFilterProps = {
  toggleOpened: boolean;
  toggle: () => void;
  tagValue: Item[];
  setTagValue: React.Dispatch<React.SetStateAction<Item[]>>;
  examineeId: string;
  nameOrEmail: string;
  tagOptions: Item[];
};

export const SearchFilter = ({
  toggleOpened,
  toggle,
  tagValue,
  setTagValue,
  examineeId,
  nameOrEmail,
  tagOptions,
}: SearchFilterProps) => (
  <Stack bg="white" p={rem(32)} gap={rem(32)}>
    <Flex
      justify="space-between"
      component="a"
      variant="transparent"
      onClick={toggle}
    >
      <Group align="center" gap={rem(8)}>
        <FilterIcon />
        検索フィルター
      </Group>
      {toggleOpened ? <ArrowUpIcon /> : <ArrowDownIcon />}
    </Flex>
    <Collapse in={toggleOpened}>
      <Form method="get">
        <TextInput type="hidden" name="page" value="1" />
        <Stack gap={rem(32)}>
          <Stack gap={rem(8)}>
            <Flex gap={rem(16)}>
              <TextInput
                type="text"
                name="examineeId"
                label="受験者ID"
                placeholder="受験者IDを入力してください"
                flex={1}
                defaultValue={examineeId}
              />
              <TextInput
                type="text"
                name="nameOrEmail"
                label="名前 or メールアドレス"
                placeholder="名前 or メールアドレス"
                flex={1}
                defaultValue={nameOrEmail}
              />
            </Flex>
            <TagsInput
              label="タグ"
              values={tagValue}
              setValues={setTagValue}
              options={tagOptions}
            />
            {/* TagsInputは自動的にクエリパラメータに追加されないため、隠しフォームで扱う */}
            <TextInput
              type="hidden"
              name="tags"
              value={tagValue.map((tag) => tag.name).join(",")}
            />
          </Stack>
          <Center>
            <Button type="submit">検索</Button>
          </Center>
        </Stack>
      </Form>
    </Collapse>
    <Collapse in={!toggleOpened}>
      <Flex justify={"flex-start"} align={"center"} gap={rem(32)}>
        <Stack gap={rem(0)}>
          <Text>受験者ID</Text>
          <Text>{examineeId || "なし"}</Text>
        </Stack>
        <Divider orientation="vertical" />
        <Stack gap={rem(0)}>
          <Text>名前 or メールアドレス</Text>
          <Text>{nameOrEmail || "なし"}</Text>
        </Stack>
        <Divider orientation="vertical" />
        <Stack gap={rem(0)}>
          <Text>タグ</Text>
          <Text>
            {tagValue.length > 0
              ? tagValue.map((tag) => tag.name).join(", ")
              : ""}
          </Text>
        </Stack>
      </Flex>
    </Collapse>
  </Stack>
);
