import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "../../services/auth.server";
import { rem, useMantineTheme } from "@mantine/core";
import { Header } from "./Header";

// ログインしていなければログイン画面に遷移
export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
}

/**
 * _privateパス下共通layout
 */
export default function Index() {
  const theme = useMantineTheme();

  return (
    <>
      <Header />
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
