import {
  Checkbox,
  Flex,
  Group,
  Radio,
  Text,
  Textarea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { FetchedData } from "../_private.exam";
import { useOutletContext, useParams } from "@remix-run/react";
import { QuestionOptionEntity } from "../../entities/QuestionOptionEntity";
import { plainToInstance } from "class-transformer";
import { questionType } from "../../consts/questionType";

export const InputForAnswer: React.FC = () => {
  const theme = useMantineTheme();

  const { questionNumber } = useParams();
  const data = useOutletContext() as FetchedData;
  const questions = data.examAttempt.exam.examQuestions;
  const question =
    questions.find((x) => x.number === Number(questionNumber)) || questions[0];
  const option = question.option
    ? plainToInstance(
        QuestionOptionEntity,
        JSON.parse(question.option as string)
      )
    : undefined;
  const [value, setValue] = useState<string[]>([]);

  return (
    <>
      {question.type === questionType.text && <Textarea />}
      {question.type === questionType.radio && (
        <Radio.Group name="answer">
          <Group mt="xs">
            {option?.radio?.choices.map((x, i) => (
              <Radio.Card radius="md" value={x.value} key={i}>
                <Flex align="center" gap={rem(8)} p={rem(10)}>
                  <Radio.Indicator
                    color={
                      theme.colors.primaryColorPalette[
                        theme.primaryShade as number
                      ]
                    }
                  />
                  <Text style={{ fontWeight: theme.other.fontWeights.bold }}>
                    {x.label}
                  </Text>
                </Flex>
              </Radio.Card>
            ))}
          </Group>
        </Radio.Group>
      )}
      {question.type === questionType.checkBox && (
        <Checkbox.Group value={value} onChange={setValue}>
          <Group mt="xs">
            {option?.checkBox?.choices.map((x, i) => (
              <Checkbox.Card radius="md" key={i} value={x.value}>
                <Flex align="center" gap={rem(8)} p={rem(10)}>
                  <Checkbox.Indicator
                    color={
                      theme.colors.primaryColorPalette[
                        theme.primaryShade as number
                      ]
                    }
                  />
                  <Text style={{ fontWeight: theme.other.fontWeights.bold }}>
                    {x.label}
                  </Text>
                </Flex>
              </Checkbox.Card>
            ))}
          </Group>
        </Checkbox.Group>
      )}
    </>
  );
};
