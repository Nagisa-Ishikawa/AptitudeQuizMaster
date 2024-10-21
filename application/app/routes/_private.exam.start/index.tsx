import {
  Center,
  Checkbox,
  rem,
  Space,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { ActionFunction, redirect } from "@remix-run/node";
import { useNavigate, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { ButtonA } from "../../components/Button/ButtonA";
import { Paper } from "../../components/Paper";
import { pages } from "../../consts/Pages";
import { prisma } from "../../services/db.server";
import { FetchedData } from "../_private.exam";

export default function Index() {
  const data = useOutletContext() as FetchedData;
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const timeLimit = data.examAttempt.exam.examQuestions.reduce(
    (sum, cur) => sum + cur.timeLimit,
    0
  );

  const info = [
    { title: "試験時間", text: `試験時間は最大${timeLimit}分です。` },
    {
      title: "ツールについて",
      text: `筆記用具、計算が必要な問題のための基本的な電卓の利用が可能です。
プログラマブル電卓やスマートフォンの使用は禁止です。`,
    },
    {
      title: "試験環境",
      text: "静かな環境で試験を受けてください。試験中の不正行為は厳しく禁じられています。",
    },
    {
      title: "回答時間について",
      text: `問題1問ごとに回答時間が設けられています。
回答時間が経過すると、自動的に次の問題に進みます。前の問題に戻って回答することはできません。
全ての問題が終了したら、試験は自動的に終了します。`,
    },
  ];

  return (
    <>
      <Paper m={`${rem(80)} ${rem(80)} ${rem(40)} ${rem(80)}`}>
        <Text>
          試験を開始する前に、以下の注意事項をご確認ください。すべての内容を理解し、同意の上で試験を始めてください。
        </Text>
        <Table verticalSpacing={rem(8)} withRowBorders={false}>
          <Table.Tbody>
            {info.map((x, i) => (
              <Table.Tr key={i}>
                <Table.Td
                  pl={rem(10)}
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {x.title}
                </Table.Td>
                <Table.Td pl={rem(8)}>:</Table.Td>
                <Table.Td>{x.text}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Center mt={rem(32)}>
          <Checkbox
            label="同意する"
            styles={{
              label: { fontSize: theme.fontSizes.lg, fontWeight: "700" },
            }}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </Center>
      </Paper>

      <Center>
        <ButtonA
          onClick={() => navigate(pages.examQuestion.path)}
          disabled={!isChecked}
          h={rem(76)}
          w={rem(320)}
          radius={rem(50)}
          style={{ fontSize: theme.fontSizes.xll }}
        >
          試験を開始
        </ButtonA>
      </Center>

      <Space h={rem(80)} />
    </>
  );
}

export const action: ActionFunction = async () => {
  const now = new Date();

  await prisma.examAttempt.update({
    where: {
      id: 1,
    },
    data: {
      startDate: now,
    },
  });

  return redirect(pages.examQuestion.path);
};
