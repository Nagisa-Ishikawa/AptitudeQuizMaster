import { Flex, rem, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { StarIcon } from "../../components/Icon/StarIcon";
import { LinkedExamQuestion } from "../_private.exam";

type Props = {
  question: LinkedExamQuestion;
};

export const CheckLaterMark: React.FC<Props> = ({ question }: Props) => {
  const theme = useMantineTheme();
  const [isMarked, setIsMarked] = useState(question.examineeAnswer?.isMarked);

  return (
    <Flex
      align="center"
      gap={rem(2)}
      style={{ cursor: "pointer" }}
      onClick={() => setIsMarked((x) => !x)}
    >
      <input type="hidden" name="isMarked" value={String(isMarked)} />
      <StarIcon isStarred={isMarked} />
      <Text
        style={{
          fontWeight: theme.other.fontWeights.bold,
          fontSize: theme.fontSizes.sm,
        }}
      >
        後で見返す
      </Text>
    </Flex>
  );
};
