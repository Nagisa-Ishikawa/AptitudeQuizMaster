import { Button } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { pages } from "../../consts/pages";

export default function SuccessRoute() {
  const navigate = useNavigate();

  return (
    <main>
      <div>ログイン成功しました。</div>
      <div>試験を開始しますか？</div>
      <div>
        <form action="/logout" method="post">
          {/* TODO: もうちょいマシなパレットを追加する */}
          <Button type="submit" color="secondaryColorPallet">
            サインアウト
          </Button>
          <Button onClick={() => navigate(pages.examQuestionList.path)}>
            試験を開始する
          </Button>
        </form>
      </div>
    </main>
  );
}
