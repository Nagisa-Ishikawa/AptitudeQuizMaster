import { Button, Checkbox, Paper, useMantineTheme } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";

export default function SuccessRoute() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [isChecked, setIsChecked] = useState<boolean>(false);  // チェックボックスの状態を管理する state, 型は boolean
  console.log(isChecked);
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);  // event の型を React.ChangeEvent<HTMLInputElement> に指定
  };
  return (
    <main>
      <Paper
        style={{
          margin: "80px auto 40px auto",
          border: "2px solid #0141A0",
          padding: "40px",
          borderRadius: "0",
          fontSize: theme.fontSizes.md,
          maxWidth: "1280px",
        }}
      >
        <p style={{ fontWeight: "700", marginBottom: "32px" }}>
          試験を開始する前に、以下の注意事項をご確認ください。すべての内容を理解し、同意の上で試験を始めてください。
        </p>
        <table>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap", paddingBottom: "16px" }}>
              受験期間
            </td>
            <td style={{ paddingRight: "8px" ,paddingBottom: "16px"}}>:</td>
            <td style={{ paddingBottom: "16px"}}>0000/00/00 00:00まで</td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap", paddingBottom: "16px" }}>
              制限期間
            </td>
            <td style={{ paddingRight: "8px" ,paddingBottom: "16px"}}>:</td>
            <td style={{ paddingBottom: "16px"}}>本試験は合計XXXX分です。</td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap", paddingBottom: "16px" }}>
              持ち物
            </td>
            <td style={{ paddingRight: "8px" ,paddingBottom: "16px"}}>:</td>
            <td style={{ paddingBottom: "16px"}}>
              筆記用具、計算が必要な問題のための基本的な電卓（プログラマブル電卓やスマートフォンの使用は禁止です）、飲み物等。
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap", paddingBottom: "16px" }}>
              試験環境
            </td>
            <td style={{ paddingRight: "8px" ,paddingBottom: "16px"}}>:</td>
            <td style={{ paddingBottom: "16px"}}>
              静かな環境で試験を受けてください。試験中の不正行為は厳しく禁じられています。監督者による監視が行われます。
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap", paddingBottom: "16px" }}>
              問題形式
            </td>
            <td style={{ paddingRight: "8px" ,paddingBottom: "16px"}}>:</td>
            <td style={{ paddingBottom: "16px"}}>
              必要に応じて、言語理解、数的処理、非言語問題等、様々なタイプの問題が出題されます。
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap", paddingBottom: "16px" }}>
              解答方法
            </td>
            <td style={{ paddingRight: "8px" ,paddingBottom: "16px"}}>:</td>
            <td style={{ paddingBottom: "16px"}}>
              すべての問題は選択式です。最良と思われる選択肢を選んでください。
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "10px", whiteSpace: "nowrap", paddingBottom: "40px" }}>
              試験の終了
            </td>
            <td style={{ paddingRight: "8px" ,paddingBottom: "40px"}}>:</td>
            <td style={{ paddingBottom: "40px"}}>
              試験時間が経過すると自動的に終了します。すべての問題に答え終わったら、「試験の終了」ボタンを押してください。
            </td>
          </tr>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* TODO MantineTheme.tsの変数使う */}
          <Checkbox
            color="#0141A0"
            label="同意する"
            styles={{
              label: {
                fontSize: theme.fontSizes.lg,
                fontWeight: "700",
              },
            }}
            onChange={handleCheckboxChange}
          />
        </div>
      </Paper>

      <div>
        <form action="/logout" method="post">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => navigate("/exam/list")}
            style={{width: "320px", height:"76.8px", borderRadius: "50px", padding: "20.4px auto"}}
            disabled={!isChecked}
            styles={{
              label: {
                fontSize: theme.fontSizes.lg,
                fontWeight: "700",
              },
            }}
            >試験を開始</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
