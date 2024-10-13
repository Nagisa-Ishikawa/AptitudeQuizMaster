import { Flex } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import React from "react";
import { NavigateBeforeIcon } from "../Icon/NavigateBeforeIcon";
import { Link } from "./Link";

type Props = {
  text: string;
  to: string;
};

/**
 * 左向き矢印付きリンク
 */
export const BackLink: React.FC<Props> = ({ text, to }: Props) => {
  const navigate = useNavigate();
  return (
    <Flex
      align="center"
      onClick={() => navigate(to)}
      style={{ cursor: "pointer" }}
    >
      <NavigateBeforeIcon />
      <Link text={text} to={to} />
    </Flex>
  );
};
