import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

// ログインしていなければログイン画面に遷移
export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
}

/**
 * _privateパス共通layout
 */
export default function Layout() {
  return <Outlet />;
}
