import { Center, Group, rem } from "@mantine/core";
import React from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { ButtonB } from "../../components/Button/ButtonB";
import { ModalA } from "../../components/Modal/ModalA";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stack: any;
  formRef: React.RefObject<HTMLFormElement>;
};

export const CreateComfirmModal: React.FC<Props> = ({
  stack,
  formRef,
}: Props) => {
  return (
    <ModalA title="受験者 登録" {...stack.register("confirm")}>
      <Center mt={rem(16)}>
        <Group gap={rem(16)}>
          <ButtonB onClick={() => stack.close("confirm")}>戻る</ButtonB>
          <ButtonA
            onClick={() => {
              formRef.current?.submit();
            }}
          >
            進む
          </ButtonA>
        </Group>
      </Center>
    </ModalA>
  );
};
