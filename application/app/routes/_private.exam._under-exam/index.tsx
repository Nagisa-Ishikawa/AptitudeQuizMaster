import { Flex, Stack, rem } from "@mantine/core";
import { Outlet, useOutletContext } from "@remix-run/react";
import { FetchedData } from "../_private.exam";
import { TimeLeft } from "./TimeLeft";

/** _private.exam._under-examパス下共通処理 */
export default function Index() {
  const data = useOutletContext() as FetchedData;

  return (
    <Stack
      w={"100%"}
      style={{ padding: `${rem(30)} ${rem(80)} ${rem(40)} ${rem(80)}` }}
      gap={rem(24)}
    >
      <Flex align="center" justify="flex-end">
        {/* 残り時間 */}
        <TimeLeft />
      </Flex>
      <Outlet context={data} />
    </Stack>
  );
}
