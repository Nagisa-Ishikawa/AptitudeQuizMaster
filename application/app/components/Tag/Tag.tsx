import { Pill, PillProps, rem, useMantineTheme } from "@mantine/core";
import { Item } from "./TagsInput";

type Props = PillProps & {
  tag: Item;
};

// 表示用のタグコンポーネント
export const Tag: React.FC<Props> = ({ ...props }: Props) => {
  const { tag } = props;
  const theme = useMantineTheme();

  return (
    <Pill
      key={tag.name}
      bg={tag.color}
      style={{
        height: rem(30),
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.other.fontWeights.bold,
        padding: `${rem(4)} ${rem(16)}`,
      }}
      {...props}
    >
      {tag.name}
    </Pill>
  );
};
