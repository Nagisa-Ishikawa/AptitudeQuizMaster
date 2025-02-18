import { rem, useModalsStack } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import React, { useRef } from "react";
import { FetchedData } from ".";
import { EditIcon } from "../../components/Icon/EditIcon";
import { RegistrationConfirmModal } from "./RegistrationConfirmModal";
import { RegistrationInputModal } from "./RegistrationInputModal";

type Props = {
  id: number;
};

export const UpdateButton: React.FC<Props> = ({ id }: Props) => {
  const modalsStack = useModalsStack(["input", "confirm"]);
  const formRef = useRef<HTMLFormElement | null>(null);

  const data = useLoaderData<FetchedData>();
  const examinee = data.examinees.find((x) => x.id === id);
  if (!examinee) return <></>;
  const defaultValues = {
    ...examinee,
    note: examinee.note || undefined,
    tags: examinee.tags?.map((y) => ({ name: y.name, color: y.color })) || [],
    exam: examinee.exams[0]?.id,
  };

  return (
    <>
      <EditIcon
        size={rem(24)}
        style={{ cursor: "pointer" }}
        onClick={() => {
          modalsStack.open("input");
        }}
      />

      <RegistrationInputModal
        defaultValues={defaultValues}
        stack={modalsStack}
        formRef={formRef}
      />
      <RegistrationConfirmModal stack={modalsStack} formRef={formRef} />
    </>
  );
};
