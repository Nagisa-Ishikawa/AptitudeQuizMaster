import { Divider, Flex, Grid, rem, Text, useMantineTheme } from "@mantine/core";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { Paper } from "../../components/Paper";
import { pages } from "../../consts/Pages";
import { AnswerEntity } from "../../entities/AnswerEntity";
import { questionType } from "../../entities/QuestionOptionEntity";
import { findFirstNotStartedQuestionIndex } from "../../functions/findFirstNotStartedQuestionIndex";
import { prisma } from "../../services/db.server";
import { FetchedData, loader as parentLoader } from "../_private.exam";
import { InputForAnswer } from "./InputForAnswer";
import { Question } from "./Question";

export default function Index() {
  // TODO: 画面移動しようとした時に警告
  // TODO: 値入れてない時にボタン押せないようにする
  const theme = useMantineTheme();
  const data = useLoaderData<FetchedData>() as unknown as FetchedData;

  if (!data?.examAttempt?.exam?.examQuestions) {
    throw new Error("データがありません");
  }

  const formRef = useRef<HTMLFormElement>(null);
  const questionIndex = findFirstNotStartedQuestionIndex(data.examAttempt);
  const questions = data.examAttempt.exam.examQuestions;
  const question = questions[questionIndex];

  return (
    <form ref={formRef} method="POST">
      <input
        type="hidden"
        name="answerId"
        value={question.examineeAnswer?.id}
      />
      <input type="hidden" name="attemptId" value={data.examAttempt.id} />
      <input type="hidden" name="questionId" value={question.id} />
      <input type="hidden" name="questionIndex" value={questionIndex} />
      <input type="hidden" name="questionType" value={question.type} />

      <Paper>
        <Flex align="center" justify="space-between">
          {/* 問題番号 */}
          <Text
            style={{
              fontWeight: theme.other.fontWeights.bold,
            }}
          >
            {question.number + 1}問目
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
        <ButtonA h={rem(60)} w={rem(240)} type="submit">
          次へ
        </ButtonA>
      </Flex>
    </form>
  );
}

export const loader: LoaderFunction = async ({ params, request, context }) => {
  const parentResponse = await parentLoader({ request, context, params });
  if (!parentResponse) {
    throw new Error("親ローダーからのレスポンスがありません");
  }
  if (!("json" in parentResponse)) {
    throw new Error("親ローダーからのレスポンスが予期しない形式です");
  }
  const now = new Date();
  const data = (await parentResponse.json()) as FetchedData;
  const questionIndex = findFirstNotStartedQuestionIndex(data.examAttempt);

  // 回答開始前の問題がない場合、完了ページにリダイレクト
  if (questionIndex === -1) return redirect(pages.examResult.path);

  // 回答開始時間を記録
  const questions = data.examAttempt.exam.examQuestions;
  const question = questions[questionIndex];

  const examineeAnswer = await prisma.examineeAnswer.findFirst({
    where: { examAttemptId: data.examAttempt.id, examQuestionId: question.id },
  });
  if (examineeAnswer) {
    return redirect(pages.examQuestion.path);
  }

  await prisma.examineeAnswer.create({
    data: {
      examAttemptId: data.examAttempt.id,
      examQuestionId: question.id,
      startDate: now,
      createdAt: now,
      updatedAt: now,
    },
  });

  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  const now = new Date();

  const formData = await request.formData();
  const examAnswerId = Number(formData.get("answerId"));
  const examAttemptId = Number(formData.get("attemptId"));
  const examQuestionId = Number(formData.get("questionId"));
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
      updatedAt: now,
    },
    create: {
      examAttemptId: examAttemptId,
      examQuestionId: examQuestionId,
      answer: JSON.stringify(answer) ?? null,
      createdAt: now,
      updatedAt: now,
    },
  });

  return redirect(pages.examQuestion.path);
};
