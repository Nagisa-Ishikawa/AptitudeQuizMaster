import {
  Center,
  Combobox,
  Group,
  Pill,
  PillsInput,
  rem,
  useCombobox,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";

type Props = {
  values: Item[];
  setValues: React.Dispatch<React.SetStateAction<Item[]>>;

  options: Item[];
} & React.ComponentProps<typeof PillsInput>;

export type Item = {
  name: string;
  color?: string;
};

/**
 * タグを入力するコンポーネント
 * MantineのTagsInputではタグごとの色情報の付与が実現できなかったので、PillsInputとComboboxを組み合わせて作ってる
 */
export const TagsInput: React.FC<Props> = ({
  values,
  setValues,
  options,
  ...props
}: Props) => {
  const theme = useMantineTheme();
  const [text, setText] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const handleTagRemove = (x: string) =>
    setValues((currentTags) => currentTags.filter((y) => y.name !== x));

  // 入力中のテキストに一致するオプションのみに絞り込む
  const matchingOptions = options.filter(
    (x) =>
      !values.some((y) => y.name === x.name) &&
      x.name.toLowerCase().includes(text.trim().toLowerCase())
  );

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(x) => {
        setValues((currentTags) =>
          currentTags.some((y) => y.name === x)
            ? currentTags.filter((y) => y.name !== x)
            : [
                ...currentTags,
                {
                  name: x,
                  color:
                    options.find((y) => y.name === x)?.color ??
                    theme.colors.gray[2],
                },
              ]
        );
      }}
    >
      {/* タグ */}
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()} {...props}>
          <Pill.Group>
            {values.map((x) => (
              <Pill
                key={x.name}
                withRemoveButton
                onRemove={() => handleTagRemove(x.name)}
                bg={x.color}
                style={{
                  height: rem(30),
                  fontSize: theme.fontSizes.xss,
                  fontWeight: theme.other.fontWeights.bold,
                  padding: `${rem(4)} ${rem(8)} ${rem(4)} ${rem(14)}`,
                }}
              >
                {x.name}
              </Pill>
            ))}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={text}
                onChange={(e) => {
                  setText(e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                  // バックスペース押下時、最後のピルを削除
                  if (e.key === "Backspace" && text.length === 0) {
                    e.preventDefault();
                    handleTagRemove(values[values.length - 1].name);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      {/* タグ選択肢 */}
      <Combobox.Dropdown>
        <Combobox.Options>
          {matchingOptions.length > 0 ? (
            // 表示可能なオプションがある
            matchingOptions.map((x, i) => (
              <Combobox.Option value={x.name} key={i}>
                <Group gap="sm">
                  <Center
                    bg={x.color}
                    style={{
                      height: rem(30),
                      fontSize: theme.fontSizes.xss,
                      fontWeight: theme.other.fontWeights.bold,
                      borderRadius: rem(100),
                      padding: `${rem(4)} ${rem(12)}`,
                    }}
                  >
                    {x.name}
                  </Center>
                </Group>
              </Combobox.Option>
            ))
          ) : (
            // オプション表示不可
            <Combobox.Empty>Nothing found...</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
