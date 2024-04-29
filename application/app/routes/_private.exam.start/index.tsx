import { Button, Paper, useMantineTheme } from "@mantine/core";
import { useNavigate } from "@remix-run/react";

export default function SuccessRoute() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  return (
    <main>
      <Paper
        style={{
          margin: "80px auto 32px auto",
          border: "2px solid #0141A0",
          padding: "40px",
          borderRadius: "0",
          fontSize: theme.fontSizes.md,
          maxWidth: "1280px",
        }}
      >
        <p>
          試験を開始する前に、以下の注意事項をご確認ください。すべての内容を理解し、同意の上で試験を始めてください。
        </p>
        <table>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              受験期間:
            </td>
            <td>0000/00/00 00:00まで</td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              制限期間:
            </td>
            <td>本試験は合計XXXX分です。</td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              持ち物:
            </td>
            <td>
              筆記用具、計算が必要な問題のための基本的な電卓（プログラマブル電卓やスマートフォンの使用は禁止です）、飲み物等。
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              試験環境:
            </td>
            <td>
              静かな環境で試験を受けてください。試験中の不正行為は厳しく禁じられています。監督者による監視が行われます。
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              問題形式:
            </td>
            <td>
              必要に応じて、言語理解、数的処理、非言語問題等、様々なタイプの問題が出題されます。
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              解答方法:
            </td>
            <td>
              すべての問題は選択式です。最良と思われる選択肢を選んでください。
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap" }}>
              試験の終了:
            </td>
            <td>
              試験時間が経過すると自動的に終了します。すべての問題に答え終わったら、「試験の終了」ボタンを押してください。
            </td>
          </tr>
        </table>
      </Paper>
      <div>
        <form action="/logout" method="post">
          {/* TODO: もうちょいマシなパレットを追加する */}
          {/* <Button type="submit" color="secondaryColorPallet">
            サインアウト
          </Button> */}
          <Button onClick={() => navigate("/exam/list")}>試験を開始する</Button>
        </form>
      </div>
    </main>
  );
}
