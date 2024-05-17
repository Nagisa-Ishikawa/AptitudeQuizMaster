import { Flex, Space, Text, useMantineTheme } from "@mantine/core";
import { TimerIcon } from "../../components/Icon/TimerIcon";

import { CircleProgress } from "../../components/Progress/CircleProgress";

type Props = {
  /** 試験経過時間の割合 0 ~ 100 */
  perOfElapsed: number;
  /** 残りの時間 分：秒の形式 */
  leftTime: string;
};

/**
 * 試験の残り時間を表すのに使うプログレス
 */
export const TimeLeft: React.FC<Props> = ({
  perOfElapsed,
  leftTime,
}: Props) => {
  const theme = useMantineTheme();

  return (
    <Flex align="center">
      <TimerIcon />
      <Space w="xs" />
      <Text
        style={{
          color: theme.colors.textColor[theme.primaryShade as number],
          fontSize: theme.fontSizes.sm,
          fontWeight: theme.other.fontWeights.bold,
        }}
      >
        残り時間
      </Text>
      <Space w="xs" />
      <CircleProgress value={perOfElapsed} label={leftTime} />
    </Flex>
  );
};
