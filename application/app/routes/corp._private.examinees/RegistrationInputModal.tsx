import { Center, Flex, Group, rem, Stack, VisuallyHidden } from "@mantine/core";
import { Form, useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { FetchedData } from ".";
import { ButtonA } from "../../components/Button/ButtonA";
import { ButtonB } from "../../components/Button/ButtonB";
import { IdNameTagsSelect } from "../../components/Input/Select/IdNameTagsSelect";
import {
  AdditionalTagsInput,
  Item as TagItem,
} from "../../components/Input/TagsInput/AdditionalTagsInput";
import { Textarea } from "../../components/Input/Text/Textarea";
import { TextInput } from "../../components/Input/Text/TextInput";
import { ModalA } from "../../components/Modal/ModalA";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stack: any;
  formRef: React.RefObject<HTMLFormElement>;
  defaultValues?: {
    id: number;
    name: string;
    email: string;
    tags: TagItem[];
    exam?: number;
    note?: string;
  };
};

export const RegistrationInputModal: React.FC<Props> = ({
  stack,
  formRef,
  defaultValues,
}: Props) => {
  const data = useLoaderData<FetchedData>();
  const [tags, setTags] = useState<TagItem[]>(defaultValues?.tags || []);

  const onClose = () => {
    formRef.current?.reset();
    setTags(defaultValues?.tags || []);
    stack.closeAll();
  };
  const onNext = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }
    stack.open("confirm");
  };

  return (
    <ModalA
      title={`受験者 ${defaultValues ? "更新" : "登録"}`}
      {...stack.register("input")}
      onClose={onClose}
    >
      <Stack>
        <Form ref={formRef} method="POST">
          <Flex gap={rem(16)}>
            <VisuallyHidden>
              <TextInput
                name="id"
                label="受験者ID"
                type="number"
                value={defaultValues?.id}
              />
            </VisuallyHidden>
            <TextInput
              name="name"
              label="名前"
              defaultValue={defaultValues?.name}
              required
              w="100%"
            />
            <TextInput
              name="email"
              label="メールアドレス"
              type="email"
              defaultValue={defaultValues?.email}
              required
              w="100%"
            />
          </Flex>
          <AdditionalTagsInput
            name="tags"
            label="タグ"
            w="100%"
            values={tags}
            setValues={setTags}
            options={data.tagsMaster}
          />
          <IdNameTagsSelect
            label="試験"
            name="exam"
            defaultValue={defaultValues?.exam?.toString()}
            w="100%"
            options={data.examsMaster}
          />
          <Textarea
            label="メモ"
            name="note"
            defaultValue={defaultValues?.note}
            w="100%"
            autosize
          />

          <Center mt={rem(16)}>
            <Group gap={rem(16)}>
              <ButtonB onClick={onClose}>戻る</ButtonB>
              <ButtonA onClick={onNext}>進む</ButtonA>
            </Group>
          </Center>
        </Form>
      </Stack>
    </ModalA>
  );
};
