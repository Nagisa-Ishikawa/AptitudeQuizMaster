import { Flex } from "@mantine/core";
import React from "react";
import { NavigateBeforeIcon } from "../../components/Icon/NavigateBeforeIcon";
import { Link } from "../../components/Link/Link";

// 問題に戻るリンク
export const BackLink: React.FC = () => {
  return (
    <Flex align="center">
      <NavigateBeforeIcon />
      <Link to="/exam/question" text="問題に戻る" />
    </Flex>
  );
};
