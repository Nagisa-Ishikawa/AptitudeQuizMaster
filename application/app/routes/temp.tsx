import { useMantineTheme } from "@mantine/core";
import { TagsInput } from "../components/Tag/TagsInput";

/**
 * TODO: 後で消す
 */
export default function Index() {
  const theme = useMantineTheme();

  return (
    <main
      style={{
        height: "100%",
        backgroundColor: theme.colors.bodyColor[theme.primaryShade as number],
        color: theme.colors.textColor[theme.primaryShade as number],
      }}
    >
      <TagsInput defaultOption={["新卒", "既卒"]} />
    </main>
  );
}
