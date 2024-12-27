import { Center, Flex, Group, rem, Stack } from "@mantine/core";
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
};

export const CreateModal: React.FC<Props> = ({ stack, formRef }: Props) => {
  const data = useLoaderData<FetchedData>();
  const [tags, setTags] = useState<TagItem[]>([]);

  const onClose = () => {
    formRef.current?.reset();
    setTags([]);
    stack.closeAll();
  };
  const onNext = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }
    stack.open("confirm");
  };

  return (
    <ModalA title="受験者 登録" {...stack.register("input")} onClose={onClose}>
      <Stack>
        <Form ref={formRef} method="POST">
          <Flex gap={rem(16)}>
            <TextInput name="name" label="名前" required w="100%" />
            <TextInput
              name="email"
              label="メールアドレス"
              type="email"
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
            w="100%"
            options={data.examsMaster}
          />
          <Textarea label="メモ" name="note" w="100%" />

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
