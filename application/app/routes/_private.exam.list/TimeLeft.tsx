import { Flex, Space, Text, useMantineTheme } from "@mantine/core";
import { TimerIcon } from "../../components/Icon/TimerIcon";

import { CircleProgress } from "../../components/Progress/CircleProgress";
import { useCalculateRemainingTime } from "../../hooks/useCalcDate";
import { useEffect, useState } from "react";
import { addSeconds } from "date-fns";

// 残り時間
export const TimeLeft: React.FC = () => {
  const theme = useMantineTheme();

  const [currentTime, setCurrentTime] = useState(new Date());
  const examStartDate = new Date("2024-04-03T07:30:00");
  const timeLimit = 100;

  const [remainingTime, remainingPercentage] = useCalculateRemainingTime(
    examStartDate,
    currentTime,
    timeLimit
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime((current) => addSeconds(current, 1));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

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
      <CircleProgress value={100 - remainingPercentage} label={remainingTime} />
    </Flex>
  );
};
