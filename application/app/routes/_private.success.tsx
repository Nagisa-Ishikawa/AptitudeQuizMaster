import { Button } from "@mantine/core";
import { useNavigate } from "@remix-run/react";

export default function SuccessRoute() {
  const navigate = useNavigate();

  return (
    <main>
      <div>ログイン成功しました。</div>
      <div>
        <form action="/logout" method="post">
          <button type="submit">サインアウト</button>
          <Button onClick={() => navigate("/exam/list")}>試験を開始する</Button>
        </form>
      </div>
    </main>
  );
}
