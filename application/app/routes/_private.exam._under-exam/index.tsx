import { Outlet, useLocation, useOutletContext } from "@remix-run/react";
import { FetchedData } from "../_private.exam";
import { Flex, Stack, rem } from "@mantine/core";
import { TimeLeft } from "./TimeLeft";
import { BackLink } from "../../components/Link/BackLink";
import { pages } from "../../consts/pages";

/** _private.exam._under-examパス下共通処理 */
export default function Index() {
  const data = useOutletContext() as FetchedData;
  const location = useLocation();

  return (
    <main>
      <Stack
        w={"100%"}
        style={{ padding: `${rem(30)} ${rem(80)} ${rem(40)} ${rem(80)}` }}
        gap={rem(24)}
      >
        <Flex align="center" justify="space-between">
          {/* リンク */}
          {location.pathname === pages.examQuestionList.path ? (
            <BackLink text="問題に戻る" to={`${pages.examQuestion.path}/1`} />
          ) : (
            <BackLink text="一覧を見る" to={pages.examQuestionList.path} />
          )}
          {/* 残り時間 */}
          <TimeLeft />
        </Flex>
        <Outlet context={data} />
      </Stack>
    </main>
  );
}
