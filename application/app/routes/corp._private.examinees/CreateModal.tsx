import { Center, Flex, Group, rem, Stack } from "@mantine/core";
import { Form, useLoaderData } from "@remix-run/react";
import React, { useRef, useState } from "react";
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
};

export const CreateModal: React.FC<Props> = ({ stack }: Props) => {
  const data = useLoaderData<FetchedData>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState<TagItem[]>([]);

  return (
    <ModalA title="受験者 登録" {...stack.register("input")}>
      <Stack>
        <Form method="post" ref={formRef}>
          <Flex gap={rem(16)}>
            <TextInput
              name="name"
              label="名前"
              required
              w="100%"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <TextInput
              name="email"
              label="メールアドレス"
              required
              w="100%"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
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
              <ButtonB onClick={stack.closeAll}>戻る</ButtonB>
              <ButtonA
                onClick={() => {
                  if (!formRef.current?.reportValidity()) {
                    return;
                  }
                  stack.open("confirm");
                }}
              >
                進む
              </ButtonA>
            </Group>
          </Center>
        </Form>
      </Stack>
    </ModalA>
  );
};
