import {
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Group,
  NumberInput,
  rem,
  Stack,
  TagsInput,
  Text,
  TextInput,
} from "@mantine/core";
import { ArrowDownIcon } from "../../components/Icon/ArrowDownIcon";
import { ArrowUpIcon } from "../../components/Icon/ArrowUpIcon";
import { FilterIcon } from "../../components/Icon/FilterIcon";

type SearchFilterProps = {
  toggleOpened: boolean;
  toggle: () => void;
  tagValue: string[];
  setTagValue: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SearchFilter = ({
  toggleOpened,
  toggle,
  tagValue,
  setTagValue,
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
);
