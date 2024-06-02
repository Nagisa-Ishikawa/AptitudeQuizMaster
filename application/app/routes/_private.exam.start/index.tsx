import {
  Table,
  Button,
  Checkbox,
  rem,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useNavigate, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { FetchedData } from "../_private.exam";
import CustomPaper from "../../components/paper/Paper";
import { format } from "date-fns";

export default function SuccessRoute() {
  const data = useOutletContext() as FetchedData;
  const examPeriodEndDateRaw = data.examinee.examPeriodEndDate;

  if (!examPeriodEndDateRaw) {
    throw new Error("試験を開始してください");
  }

  const leftTime = data.exam.timeLimit;

  const examPeriodEndDate = new Date(examPeriodEndDateRaw);
  const formattedDate = format(examPeriodEndDate, "yyyy/MM/dd HH:mm");

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const tableData = [
    { title: "受験期間", text: `${formattedDate}まで` },
    { title: "制限期間", text: `本試験は合計${leftTime}分です。` },
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
    <main style={{ padding: `0 ${rem(80)} ${rem(120)} ${rem(80)}` }}>
      <CustomPaper>
        <p style={{ fontWeight: "700", marginBottom: rem(32) }}>
          試験を開始する前に、以下の注意事項をご確認ください。すべての内容を理解し、同意の上で試験を始めてください。
        </p>
        <Table verticalSpacing={rem(8)} withRowBorders={false}>
          <Table.Tbody>
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
          </Table.Tbody>
        </Table>
        <Flex align="center" style={{ marginTop: rem(32) }} justify="center">
          <Checkbox
            color={theme.colors.primaryColor[theme.primaryShade as number]}
            label="同意する"
            styles={{
              label: { fontSize: theme.fontSizes.lg, fontWeight: "700" },
            }}
            onChange={handleCheckboxChange}
          />
        </Flex>
      </CustomPaper>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => navigate("/exam/list")}
            style={{ width: rem(320), height: rem(76), borderRadius: rem(50) }}
            disabled={!isChecked}
            styles={{
              label: { fontSize: theme.fontSizes.lg, fontWeight: "700" },
            }}
          >
            試験を開始
          </Button>
        </div>
      </div>
    </main>
  );
}
