import { Flex } from "@mantine/core";
import React from "react";
import { NavigateBefore } from "../../components/Icon/NavigateBefore";
import { Link } from "../../components/Link/Link";

export const BackLink: React.FC = () => {
  return (
    <Flex align="center">
      <NavigateBefore />
      <Link to="/exam/question" text="問題に戻る" />
    </Flex>
  );
};
