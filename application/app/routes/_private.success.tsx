import { Button } from "@mantine/core";

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
