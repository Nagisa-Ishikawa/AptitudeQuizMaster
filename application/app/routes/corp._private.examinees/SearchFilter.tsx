import {
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Group,
  Pill,
  rem,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Form } from "@remix-run/react";
import { ArrowDownIcon } from "../../components/Icon/ArrowDownIcon";
import { ArrowUpIcon } from "../../components/Icon/ArrowUpIcon";
import { FilterIcon } from "../../components/Icon/FilterIcon";
import { Tag } from "../../components/Tag/Tag";
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
}: SearchFilterProps) => {
  const theme = useMantineTheme();

  const headerStyle = {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.other.fontWeights.bold,
  };
  const headerTextColor = theme.colors.lightTextColor[6]; //styleにまとめると反映されないため、別に定義する

  const bodyStyle = {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.other.fontWeights.bold,
  };

  return (
    <Stack bg="white" p={rem(32)} gap={rem(32)}>
      <Flex
        justify="space-between"
        component="a"
        variant="transparent"
        onClick={toggle}
      >
        <Group align="center" gap={rem(8)}>
          <FilterIcon />
          <Text size={"lg"} fw={"bold"} c={theme.primaryColor}>
            検索フィルター
          </Text>
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
                  name="examineeId"
                  label="受験者ID"
                  placeholder="受験者IDを入力してください"
                  flex={1}
                  defaultValue={examineeId}
                />
                <TextInput
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
              <Button type="submit" size={"lg"} w={rem(160)}>
                検索
              </Button>
            </Center>
          </Stack>
        </Form>
      </Collapse>
      <Collapse in={!toggleOpened}>
        <Flex justify={"flex-start"} align={"flex-start"} gap={rem(32)}>
          <Stack gap={rem(0)}>
            <Text c={headerTextColor} style={headerStyle}>
              受験者ID
            </Text>
            <Text style={bodyStyle}>{examineeId || "なし"}</Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap={rem(0)}>
            <Text c={headerTextColor} style={headerStyle}>
              名前 or メールアドレス
            </Text>
            <Text style={bodyStyle}>{nameOrEmail || "なし"}</Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap={rem(0)}>
            <Text c={headerTextColor} style={headerStyle}>
              タグ
            </Text>
            {tagValue && tagValue.length > 0 ? (
              <Pill.Group gap={rem(8)}>
                {tagValue.map((tag) => (
                  <Tag key={tag.name} tag={tag} />
                ))}
              </Pill.Group>
            ) : (
              <Text style={bodyStyle}>なし</Text>
            )}
          </Stack>
        </Flex>
      </Collapse>
    </Stack>
  );
};
