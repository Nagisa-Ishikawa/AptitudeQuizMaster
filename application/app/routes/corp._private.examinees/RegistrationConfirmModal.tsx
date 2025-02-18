import {
  Center,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { FetchedData } from ".";
import { IdBadge } from "../../components/Badge/IdBadge";
import { ButtonA } from "../../components/Button/ButtonA";
import { ButtonB } from "../../components/Button/ButtonB";
import { ExamIcon } from "../../components/Icon/ExamIcon";
import { MailIcon } from "../../components/Icon/MailIcon";
import { TagIcon } from "../../components/Icon/TagIcon";
import { ModalA } from "../../components/Modal/ModalA";
import { Paper } from "../../components/Paper";
import { Pill } from "../../components/Pill";
import { defaultExamineeTagColor } from "../../consts/tags";
import { formRef2DataObj } from "../../functions/formRef2DataObj";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stack: any;
  formRef: React.RefObject<HTMLFormElement>;
};

export const RegistrationConfirmModal: React.FC<Props> = ({
  stack,
  formRef,
}: Props) => {
  const data = useLoaderData<FetchedData>();
  const theme = useMantineTheme();
  const inputs = formRef2DataObj(formRef);

  if (!inputs) return <></>;

  return (
    <ModalA
      title={`受験者 ${inputs.id ? "更新" : "登録"}`}
      {...stack.register("confirm")}
    >
      <Stack gap={rem(32)}>
        <Center>
          <Text
            size={theme.fontSizes.md}
            style={{ fontWeight: theme.other.fontWeights.bold }}
          >
            {`このユーザを${inputs.id ? "更新" : "登録"}しますか？`}
          </Text>
        </Center>

        <Center>
          <Paper p={rem(24)} miw={rem(288)} borderWidth={rem(1)}>
            <Stack gap={rem(16)} align="center">
              {inputs.id && <IdBadge value={inputs.id} />}
              <Text
                size={theme.fontSizes.lg}
                style={{ fontWeight: theme.other.fontWeights.bold }}
              >
                {inputs.name}
              </Text>

              <Stack w="100%">
                <Flex gap={rem(8)} align="center">
                  <MailIcon size={rem(24)} />
                  <Text size={theme.fontSizes.xss}>{inputs.email}</Text>
                </Flex>
                <Flex gap={rem(8)} align="center">
                  <TagIcon size={rem(24)} />
                  {inputs.tags === "" ? (
                    <Text size={theme.fontSizes.xss}>タグ設定なし</Text>
                  ) : (
                    inputs.tags.split(",").map((name: string, i: number) => {
                      const tag = data.tagsMaster.find((x) => x.name === name);
                      {
                        return (
                          <Pill
                            key={i}
                            bg={tag ? tag.color : defaultExamineeTagColor}
                          >
                            {name}
                          </Pill>
                        );
                      }
                    })
                  )}
                </Flex>
                <Flex gap={rem(8)} align="center">
                  <ExamIcon size={rem(24)} />
                  <Text size={theme.fontSizes.xss}>
                    {inputs.exam === "" ? "試験設定なし" : inputs.exam}
                  </Text>
                </Flex>
                {inputs.note !== "" && (
                  <Textarea
                    size={theme.fontSizes.xss}
                    autosize
                    readOnly
                    value={inputs.note}
                    styles={{
                      input: {
                        padding: `${rem(8)} ${rem(16)}`,
                        border: `${rem(1)} solid ${
                          theme.colors.secondaryColorPallet[
                            theme.primaryShade as number
                          ]
                        }`,
                        color:
                          theme.colors.textColor[theme.primaryShade as number],
                        backgroundColor:
                          theme.colors.bodyColorPallet[
                            theme.primaryShade as number
                          ],
                      },
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Paper>
        </Center>

        <Center>
          <Group gap={rem(16)}>
            <ButtonB type="button" onClick={() => stack.close("confirm")}>
              戻る
            </ButtonB>
            <ButtonA type="button" onClick={() => formRef.current?.submit()}>
              {inputs.id ? "更新" : "登録"}
            </ButtonA>
          </Group>
        </Center>
      </Stack>
    </ModalA>
  );
};
