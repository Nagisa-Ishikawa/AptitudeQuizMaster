import { Flex, Space, Text, useMantineTheme } from "@mantine/core";
import { TimerIcon } from "../../components/Icon/TimerIcon";

import { CircleProgress } from "../../components/Progress/CircleProgress";

type Props = {
  timeLeft: number;
  timeLeftLabel: string;
};

export const TimeLeft: React.FC<Props> = ({
  timeLeft,
  timeLeftLabel,
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
        全体の残り時間
      </Text>
      <Space w="xs" />
      <CircleProgress value={timeLeft} label={timeLeftLabel} />
    </Flex>
  );
};
