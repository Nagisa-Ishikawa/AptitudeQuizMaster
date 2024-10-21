import { rem, useMantineTheme } from "@mantine/core";
import { TagsInput } from "../components/Tag/TagsInput";
import { examineeTagColors } from "../consts/tags";

/**
 * TODO: （石川）後で消す
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
      <TagsInput
        defaultOptions={[
          { name: "新卒", color: examineeTagColors[0] },
          { name: "未経験者", color: examineeTagColors[1] },
          { name: "経験者", color: examineeTagColors[2] },
          { name: "シニア", color: examineeTagColors[3] },
        ]}
        w={rem(300)}
      />
    </main>
  );
}
