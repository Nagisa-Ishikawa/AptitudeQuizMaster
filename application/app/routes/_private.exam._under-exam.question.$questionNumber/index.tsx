import {
  Divider,
  Flex,
  Paper,
  rem,
  useMantineTheme,
  Text,
  Grid,
  Button,
  Progress,
} from "@mantine/core";
import { useOutletContext, useParams } from "@remix-run/react";
import { FetchedData } from "../_private.exam";
import { InputForAnswer } from "./InputForAnswer";
import { CheckLaterMark } from "./CheckLaterMark";
import { useRef } from "react";
import { Question } from "./Question";
import { pages } from "../../consts/pages";
import { EditIcon } from "../../components/Icon/EditIcon";
import { ActionFunction, redirect } from "@remix-run/node";
import { prisma } from "../../services/db.server";
import { AnswerEntity } from "../../entities/AnswerEntity";
import { questionType } from "../../consts/questionType";

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

      <Paper
        style={{
          padding: `${rem(40)}`,
          borderRadius: rem(0),
          border: `${rem(2)} solid ${
            theme.colors.primaryColor[theme.primaryShade as number]
          }`,
        }}
      >
        <Flex align="center" justify="space-between">
          {/* 問題タイトル */}
          <Text
            style={{
              fontWeight: theme.other.fontWeights.bold,
            }}
          >
            {question.number}. 語彙（言語分野）
          </Text>
          {/* 後で見返すマーク */}
          <CheckLaterMark question={question} />
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
        justify="space-between"
        mt={rem(32)}
        gap={rem(20)}
        wrap="wrap"
      >
        <Button
          h={rem(60)}
          w={rem(240)}
          color={theme.colors.bodyColorPallet[theme.primaryShade as number]}
          style={{
            color: theme.colors.textColor[theme.primaryShade as number],
            borderColor:
              theme.colors.secondaryColor[theme.primaryShade as number],
          }}
          type="submit"
          name="action"
          value="previous"
        >
          前に戻る
        </Button>
        <Flex align="center" gap={rem(8)} ml="auto" mr="auto">
          <EditIcon />
          <Text
            style={{
              fontWeight: theme.other.fontWeights.bold,
              fontSize: theme.fontSizes.sm,
            }}
          >
            問題数
          </Text>
          <Progress
            value={(Number(questionNumber) * 100) / questions.length}
            w={rem(400)}
            color={theme.colors.primaryColor[theme.primaryShade as number]}
          />
        </Flex>
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
  const isMarked = formData.get("isMarked") === "true";

  // 回答 insert or update
  const examineeAnswer = await prisma.examineeAnswer.upsert({
    where: {
      id: examAnswerId,
    },
    update: {
      answer: JSON.stringify(answer),
      isMarked: isMarked,
    },
    create: {
      examAttemptId: examAttemptId,
      examQuestionId: examQuestionId,
      answer: JSON.stringify(answer),
      isMarked: isMarked,
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
