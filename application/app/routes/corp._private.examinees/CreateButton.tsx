import { useModalsStack } from "@mantine/core";
import React, { useRef } from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { RegistrationConfirmModal } from "./RegistrationConfirmModal";
import { RegistrationInputModal } from "./RegistrationInputModal";

export const CreateButton: React.FC = () => {
  const modalsStack = useModalsStack(["input", "confirm"]);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <ButtonA onClick={() => modalsStack.open("input")}>追加</ButtonA>

      <RegistrationInputModal stack={modalsStack} formRef={formRef} />
      <RegistrationConfirmModal stack={modalsStack} formRef={formRef} />
    </>
  );
};
