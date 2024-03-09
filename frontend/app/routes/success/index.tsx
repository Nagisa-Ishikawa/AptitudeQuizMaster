import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    // TODO: ログイン画面へ遷移
    failureRedirect: "/",
  });
}

export default function SuccessIndex() {
  return (
    <>
      <div>ログイン成功しました。</div>
      <div>
        <form action="/logout" method="post">
          <button type="submit">サインアウト</button>
        </form>
      </div>
    </>
  );
}
