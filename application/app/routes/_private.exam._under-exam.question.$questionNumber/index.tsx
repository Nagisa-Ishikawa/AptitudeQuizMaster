import {
  Divider,
  Flex,
  rem,
  useMantineTheme,
  Text,
  Grid,
  Button,
} from "@mantine/core";
import { useOutletContext, useParams } from "@remix-run/react";
import { FetchedData } from "../_private.exam";
import { InputForAnswer } from "./InputForAnswer";

import { useRef } from "react";
import { Question } from "./Question";
import { pages } from "../../consts/pages";
import { ActionFunction, redirect } from "@remix-run/node";
import { prisma } from "../../services/db.server";
import { AnswerEntity } from "../../entities/AnswerEntity";
import { questionType } from "../../consts/questionType";
import { Paper } from "../../components/Paper";

export default function Index() {
  const { questionNumber } = useParams();

  const theme = useMantineTheme();
  const data = useOutletContext() as FetchedData;

  const formRef = useRef<HTMLFormElement>(null);
  const questions = data.examAttempt.exam.examQuestions;
  const question = questions[Number(questionNumber) - 1] || questions[0];

  return (
    <form ref={formRef} method="POST">
      <input
        type="hidden"
        name="answerId"
        value={question.examineeAnswer?.id}
      />
      <input type="hidden" name="attemptId" value={data.examAttempt.id} />
      <input type="hidden" name="questionId" value={question.id} />
      <input
        type="hidden"
        name="questionNumber"
        value={Number(questionNumber)}
      />
      <input type="hidden" name="questionType" value={question.type} />

      <Paper>
        <Flex align="center" justify="space-between">
          {/* 問題番号 */}
          <Text
            style={{
              fontWeight: theme.other.fontWeights.bold,
            }}
          >
            {question.number}問目
          </Text>
        </Flex>

        <Divider my="md" />

        <Grid grow gutter="xs">
          <Grid.Col span={5}>
            {/* 問題文 */}
            <Question question={question} />
          </Grid.Col>
          <Grid.Col span={2}>{/* スペーサー */}</Grid.Col>
          <Grid.Col span={5}>
            {/* 回答欄 */}
            <InputForAnswer question={question} />
          </Grid.Col>
        </Grid>
      </Paper>
      <Flex
        align="center"
        justify="flex-end"
        mt={rem(32)}
        gap={rem(20)}
        wrap="wrap"
      >
        <Button
          h={rem(60)}
          w={rem(240)}
          type="submit"
          name="action"
          value="next"
        >
          次へ
        </Button>
      </Flex>
    </form>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const now = new Date();

  const formData = await request.formData();
  const action = formData.get("action");
  const examAnswerId = Number(formData.get("answerId"));
  const examAttemptId = Number(formData.get("attemptId"));
  const examQuestionId = Number(formData.get("questionId"));
  const questionNumber = Number(formData.get("questionNumber"));
  const type = Number(formData.get("questionType"));

  const answerText =
    formData.get("answerText")?.toString()?.trim() || undefined;
  const answerRadio = formData.get("answerRadio") || undefined;
  const answerCheckBox = formData.getAll("answerCheckBox") || undefined;

  let answer: AnswerEntity | undefined;
  if (type === questionType.text) {
    answer = answerText
      ? ({ text: { value: answerText } } as AnswerEntity)
      : undefined;
  } else if (type === questionType.radio) {
    answer = answerRadio
      ? ({ radio: { value: answerRadio } } as AnswerEntity)
      : undefined;
  } else if (type === questionType.checkBox) {
    answer =
      answerCheckBox && answerCheckBox.toString() !== ""
        ? ({
            checkBox: {
              values:
                formData.getAll("answerCheckBox").map((x) => x as string) ||
                undefined,
            },
          } as AnswerEntity)
        : undefined;
  }

  // 回答 insert or update
  await prisma.examineeAnswer.upsert({
    where: {
      id: examAnswerId,
    },
    update: {
      answer: JSON.stringify(answer) ?? null,
    },
    create: {
      examAttemptId: examAttemptId,
      examQuestionId: examQuestionId,
      answer: JSON.stringify(answer) ?? null,
      createdAt: now,
      updatedAt: now,
    },
  });

  return redirect(
    `${pages.examQuestion.path}/${
      action === "next" ? questionNumber + 1 : questionNumber - 1
    }`
  );
};
