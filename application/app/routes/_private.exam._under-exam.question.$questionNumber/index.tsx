import {
  Container,
  Divider,
  Flex,
  Paper,
  rem,
  useMantineTheme,
  Text,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useOutletContext, useParams } from "@remix-run/react";
import { FetchedData } from "../_private.exam";
import { StarIcon } from "../../components/Icon/StarIcon";
import { ExamineeAnswer } from "@prisma/client";

export default function Index() {
  const { questionNumber } = useParams();
  const theme = useMantineTheme();
  const data = useOutletContext() as FetchedData;
  const question =
    data.examQuestions[Number(questionNumber)] || data.examQuestions[0];

  // TODO: questionがなかった場合のエラー処理

  const answer =
    question.examineeAnswers?.filter((x) => x.answer) || ({} as ExamineeAnswer);

  console.log("🤔answer :", answer);

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
            {/* TODO: なんか数字がデザインと違うので直す */}
            {questionNumber}. 語彙（言語分野）
          </Text>

          <Flex align="center" gap={rem(2)}>
            <StarIcon isStarred={false} />
            <Text
              style={{
                fontWeight: theme.other.fontWeights.bold,
                fontSize: theme.fontSizes.sm,
              }}
            >
              後で見返す
            </Text>
          </Flex>
        </Flex>
        <Divider my="md" />
        {/* TODO: コードのハイライトとか豪華なmdにしたい */}
        {/* TODO: コピペできないように*/}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {question?.question}
        </ReactMarkdown>
      </Container>
    </Paper>
  );
}
