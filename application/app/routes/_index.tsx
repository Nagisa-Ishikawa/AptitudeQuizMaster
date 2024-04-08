import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // ログインしてれば試験画面に、ログインしていなければログイン画面に遷移
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
    successRedirect: "/exam/start",
  });
}
