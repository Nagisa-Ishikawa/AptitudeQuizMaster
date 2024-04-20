import { Flex, Image, useMantineTheme } from "@mantine/core";

import Logo from "../../../public/images/logo.svg";
import React from "react";

export const Header: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <header>
      <Flex
        h={80}
        align="center"
        style={{
          backgroundColor:
            theme.colors.secondaryColor[theme.primaryShade as number],
        }}
      >
        <Image src={Logo} alt="divxロゴ" h={60} w={160} ml={40} />
      </Flex>
    </header>
  );
};
