import {
  Table,
  Button,
  Checkbox,
  Paper,
  rem,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";

export default function SuccessRoute() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const tableData = [
    { title: "受験期間", text: "0000/00/00 00:00まで" },
    { title: "制限期間", text: "本試験は合計XXXX分です。" },
    {
      title: "持ち物",
      text: "筆記用具、計算が必要な問題のための基本的な電卓（プログラマブル電卓やスマートフォンの使用は禁止です）、飲み物等。",
    },
    {
      title: "試験環境",
      text: "静かな環境で試験を受けてください。試験中の不正行為は厳しく禁じられています。監督者による監視が行われます。",
    },
    {
      title: "問題形式",
      text: "必要に応じて、言語理解、数的処理、非言語問題等、様々なタイプの問題が出題されます。",
    },
    {
      title: "解答方法",
      text: "すべての問題は選択式です。最良と思われる選択肢を選んでください。",
    },
    {
      title: "試験の終了",
      text: "試験時間が経過すると自動的に終了します。すべての問題に答え終わったら、「試験の終了」ボタンを押してください。",
    },
  ];
  return (
    <main
      style={{
        padding: `0 ${rem(80)}`,
      }}
    >
      <Paper
        style={{
          margin: `${rem(80)} auto ${rem(40)} auto`,
          border: `${rem(2)} solid #0141A0`,
          padding: rem(40),
          borderRadius: "0",
          fontSize: theme.fontSizes.md,
          maxWidth: rem(1280),
        }}
      >
        <p style={{ fontWeight: "700", marginBottom: rem(32) }}>
          試験を開始する前に、以下の注意事項をご確認ください。すべての内容を理解し、同意の上で試験を始めてください。
        </p>
        <Table verticalSpacing={rem(8)} withRowBorders={false}>
          {tableData.map((item, index) => (
            <Table.Tr key={index}>
              <Table.Td
                style={{
                  paddingRight: rem(10),
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </Table.Td>
              <Table.Td
                style={{
                  paddingRight: rem(8),
                }}
              >
                :
              </Table.Td>
              <Table.Td>{item.text}</Table.Td>
            </Table.Tr>
          ))}
        </Table>

        <Flex align="center" style={{ marginTop: rem(32) }} justify="center">
          <Checkbox
            color={theme.colors.primaryColor[theme.primaryShade as number]}
            label="同意する"
            styles={{
              label: {
                fontSize: theme.fontSizes.lg,
                fontWeight: "700",
              },
            }}
            onChange={handleCheckboxChange}
          />
        </Flex>
      </Paper>

      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => navigate("/exam/list")}
            style={{
              width: rem(320),
              height: rem(76),
              borderRadius: rem(50),
              padding: `${rem(20)} auto`,
            }}
            disabled={!isChecked}
            styles={{
              label: {
                fontSize: theme.fontSizes.lg,
                fontWeight: "700",
              },
            }}
          >
            試験を開始
          </Button>
        </div>
      </div>
    </main>
  );
}
