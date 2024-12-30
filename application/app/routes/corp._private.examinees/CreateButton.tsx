import { useModalsStack } from "@mantine/core";
import React, { useRef } from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { CreateComfirmModal } from "./CreateComfirmModal";
import { CreateModal } from "./CreateModal";

export const CreateButton: React.FC = () => {
  const createModalsStack = useModalsStack(["input", "confirm"]);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <ButtonA onClick={() => createModalsStack.open("input")}>追加</ButtonA>

      <CreateModal stack={createModalsStack} formRef={formRef} />
      <CreateComfirmModal stack={createModalsStack} formRef={formRef} />
    </>
  );
};
