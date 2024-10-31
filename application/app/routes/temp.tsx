import { rem, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import {
  AdditionalTagsInput,
  Item,
} from "../components/Tag/AdditionalTagsInput";
import { TagsInput } from "../components/Tag/TagsInput";
import { examineeTagColors } from "../consts/tags";

/**
 * TODO: （石川）後で消す
 */
export default function Index() {
  const theme = useMantineTheme();
  const [tags, setTags] = useState<Item[]>([]);
  const [addTags, setAddTags] = useState<Item[]>([]);

  return (
    <main
      style={{
        height: "100%",
        backgroundColor: theme.colors.bodyColor[theme.primaryShade as number],
        color: theme.colors.textColor[theme.primaryShade as number],
      }}
    >
      <TagsInput
        values={tags}
        setValues={setTags}
        options={[
          { name: "新卒", color: examineeTagColors[0] },
          { name: "未経験者", color: examineeTagColors[1] },
          { name: "経験者", color: examineeTagColors[2] },
          { name: "シニア", color: examineeTagColors[3] },
        ]}
        w={rem(300)}
      />
      <AdditionalTagsInput
        values={addTags}
        setValues={setAddTags}
        options={[
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
