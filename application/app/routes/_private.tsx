import { Flex, Image, rem, useMantineTheme } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Logo from "../../public/images/logo.svg";
import { pages } from "../consts/pages";
import { authenticator } from "../services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // _privateパス下はログイン必須、ログインしてなければログイン画面に遷移
  return await authenticator.isAuthenticated(request, {
    failureRedirect: pages.login.path,
  });
}

/**
 * _privateパス下共通layout
 */
export default function Index() {
  const theme = useMantineTheme();

  return (
    <>
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

      <main
        style={{
          height: `calc(100% - ${rem(80)})`, // 100% - ヘッダーの高さ
          backgroundColor: theme.colors.bodyColor[theme.primaryShade as number],
          color: theme.colors.textColor[theme.primaryShade as number],
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
