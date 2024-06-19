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
import { QuestionOptionEntity } from "../../entities/QuestionOptionEntity";
import { questionType } from "../../consts/questionType";
import { plainToInstance } from "class-transformer";
import { LinkedExamQuestion } from "../_private.exam";
import { AnswerEntity } from "../../entities/AnswerEntity";

type Props = {
  question: LinkedExamQuestion;
};

export const InputForAnswer: React.FC<Props> = ({ question }: Props) => {
  const theme = useMantineTheme();

  const option = question.option
    ? plainToInstance(
        QuestionOptionEntity,
        JSON.parse(question.option as string)
      )
    : undefined;
  const answer = question.examineeAnswer?.answer
    ? plainToInstance(
        AnswerEntity,
        JSON.parse(question.examineeAnswer?.answer as string)
      )
    : undefined;

  const [checkBoxValue, setCheckBoxValue] = useState<string[]>(
    answer?.checkBox?.values || []
  );
  const [radioValue, setRadioValue] = useState<string>(
    answer?.radio?.value || ""
  );

  return (
    <>
      {/* テキスト */}
      {question.type === questionType.text && (
        <Textarea
          name="answerText"
          placeholder="回答を入力してください"
          autosize
          minRows={5}
          defaultValue={answer?.text?.value}
        />
      )}
      {/* ラジオボタン */}
      {question.type === questionType.radio && (
        <Radio.Group value={radioValue} onChange={setRadioValue}>
          <input type="hidden" name="answerRadio" value={radioValue} />
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
      {/* チェックボックス */}
      {question.type === questionType.checkBox && (
        <Checkbox.Group value={checkBoxValue} onChange={setCheckBoxValue}>
          <Group mt="xs">
            {option?.checkBox?.choices.map((x, i) => (
              <Checkbox.Card key={i} radius="md" value={x.value}>
                <Flex align="center" gap={rem(8)} p={rem(10)}>
                  <Checkbox
                    key={i}
                    color={
                      theme.colors.primaryColorPalette[
                        theme.primaryShade as number
                      ]
                    }
                    value={x.value}
                    name="answerCheckBox"
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
