import { Center, Flex, Text, rem, useMantineTheme } from "@mantine/core";

import { useOutletContext } from "@remix-run/react";
import React from "react";
import { FetchedData } from "../_private.exam";
import { StarIcon } from "../../components/Icon/StarIcon";

// 問題一覧
export const Questions: React.FC = () => {
  const theme = useMantineTheme();
  const data = useOutletContext() as FetchedData;

  return (
    <Flex wrap="wrap" gap={rem(16)} style={{ maxWidth: rem(784) }}>
      {data?.examQuestions?.map((x, i) => {
        const hasAnswer = x.examAnswers?.filter((x) => x.answer).length > 0;
        const isMarked = x.examAnswers?.[x.examAnswers.length - 1]?.isMarked;

        return (
          <Center
            key={i}
            h={rem(64)}
            w={rem(64)}
            bg={
              hasAnswer
                ? theme.colors.secondaryColor[theme.primaryShade as number]
                : theme.colors.bodyColor[theme.primaryShade as number]
            }
            style={{
              borderRadius: rem(20),
              cursor: "pointer",
              position: "relative",
            }}
          >
            {isMarked && <StarIcon size={rem(64)} />}
            <Text
              c={
                isMarked
                  ? theme.colors.bodyColor[theme.primaryShade as number]
                  : hasAnswer
                  ? theme.colors.bodyColor[theme.primaryShade as number]
                  : theme.colors.textColor[theme.primaryShade as number]
              }
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: theme.fontSizes.lg,
                fontWeight: theme.other.fontWeights.bold,
              }}
            >
              {i + 1}
            </Text>
          </Center>
        );
      })}
    </Flex>
  );
};
