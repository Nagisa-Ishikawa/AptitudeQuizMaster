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
  return await authenticator.authenticate("examinee-login", request, {
    successRedirect: "/success",
    // TODO: 失敗時にトースト・エラー表示
    failureRedirect: "/",
  });
}
