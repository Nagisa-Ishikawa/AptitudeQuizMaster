import { Center, Group, rem } from "@mantine/core";
import React from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { ButtonB } from "../../components/Button/ButtonB";
import { ModalA } from "../../components/Modal/ModalA";

type Props = {};

export const CreateComfirmModal: React.FC<Props> = ({}) => {
  return (
    <ModalA opened={true} onClose={() => {}} title="受験者 登録">
      <Center mt={rem(16)}>
        <Group gap={rem(16)}>
          <ButtonB>戻る</ButtonB>
          <ButtonA>進む</ButtonA>
        </Group>
      </Center>
    </ModalA>
  );
};
