import { Button } from "@mantine/core";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    // TODO: ログイン画面へ遷移
    failureRedirect: "/",
  });
}

export default function SuccessRoute() {
  const onClickCcc = () => {};

  return (
    <main>
      <div>ログイン成功しました。</div>
      <div>
        <form action="/logout" method="post">
          <button type="submit">サインアウト</button>
          <Button onClick={onClickCcc}>ccc</Button>
        </form>
      </div>
    </main>
  );
}
