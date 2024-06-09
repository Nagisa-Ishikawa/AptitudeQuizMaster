import {
  Container,
  Divider,
  Flex,
  Paper,
  rem,
  useMantineTheme,
  Text,
  Grid,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useOutletContext, useParams } from "@remix-run/react";
import { FetchedData } from "../_private.exam";
import { InputForAnswer } from "./InputForAnswer";
import { CheckLaterMark } from "./CheckLaterMark";

export default function Index() {
  const { questionNumber } = useParams();
  const theme = useMantineTheme();
  const data = useOutletContext() as FetchedData;

  const questions = data.examAttempt.exam.examQuestions;
  const question =
    questions.find((x) => {
      x.number === Number(questionNumber);
    }) || questions[0];

  // TODO: questionがなかった場合のエラー処理

  return (
    <Paper
      style={{
        padding: rem(20),
        borderRadius: rem(0),
        border: `${rem(2)} solid ${
          theme.colors.primaryColor[theme.primaryShade as number]
        }`,
      }}
    >
      <Container>
        <Flex align="center" justify="space-between">
          <Text
            style={{
              fontWeight: theme.other.fontWeights.bold,
            }}
          >
            {questionNumber}. 語彙（言語分野）
          </Text>
          <CheckLaterMark />
        </Flex>
        <Divider my="md" />

        <Grid grow gutter="xs">
          <Grid.Col span={5}>
            {/* TODO: コードのハイライトとか豪華なmdにしたい */}
            {/* TODO: コピペできないように*/}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {question?.question}
            </ReactMarkdown>
          </Grid.Col>
          <Grid.Col span={2}>{/* スペーサー */}</Grid.Col>
          <Grid.Col span={5}>
            {/* 回答欄 */}
            <InputForAnswer />
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
}
