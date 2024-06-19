import { Center, Flex, Text, rem, useMantineTheme } from "@mantine/core";

import { useNavigate, useOutletContext } from "@remix-run/react";
import React from "react";
import { FetchedData } from "../_private.exam";
import { StarIcon } from "../../components/Icon/StarIcon";
import { pages } from "../../consts/pages";

// 問題一覧
export const Questions: React.FC = () => {
  const theme = useMantineTheme();
  const data = useOutletContext() as FetchedData;
  const examQuestions = data.examAttempt.exam.examQuestions;
  const navigate = useNavigate();

  // TODO: 試験開始時、空のexamineeanswerを作成する

  return (
    <Flex wrap="wrap" gap={rem(16)} style={{ maxWidth: rem(784) }}>
      {examQuestions.map((x, i) => {
        const answer = x.examineeAnswer?.answer;
        const hasAnswer = !!answer;
        const isMarked = x.examineeAnswer?.isMarked;
        const number = i + 1;

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
            onClick={() => {
              navigate(`${pages.examQuestion.path}/${number}`);
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
              {number}
            </Text>
          </Center>
        );
      })}
    </Flex>
  );
};
