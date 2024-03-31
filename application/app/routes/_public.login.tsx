import type { MetaFunction } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { Button } from "@mantine/core";

export const meta: MetaFunction = () => {
  return [{ title: "DIVX aptitude quiz master" }];
};

export default function LoginRoute() {
  return (
    <Form method="post">
      <input type="email" name="email" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Sign In</button>
      <Button>aaa</Button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("user-login", request, {
    successRedirect: "/success",
    // TODO: 今はログイン失敗時にエラー画面に行くが、「正しい認証情報入れろや」的なエラーメッセージ表示になるはず
    // failureRedirect: "/",
  });
}
