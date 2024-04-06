import { Flex, Space, Text, useMantineTheme } from "@mantine/core";
import { TimerIcon } from "../../components/Icon/TimerIcon";

import { CircleProgress } from "../../components/Progress/CircleProgress";
import { useCalculateRemainingTime } from "../../hooks/useCalcDate";
import { useEffect, useState } from "react";
import { addSeconds } from "date-fns";
import { useOutletContext } from "@remix-run/react";
import { FetchedData } from "../_private.exam";

// 残り時間
export const TimeLeft: React.FC = () => {
  const data = useOutletContext() as FetchedData;
  const theme = useMantineTheme();

  const [currentTime, setCurrentTime] = useState(new Date());
  if (!data.examinee.examStartDate) {
    throw new Error("試験を開始してください");
  }
  const examStartDate = new Date(data.examinee.examStartDate);

  const timeLimit = data.exam.timeLimit;

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
        残り時間
      </Text>
      <Space w="xs" />
      <CircleProgress value={100 - remainingPercentage} label={remainingTime} />
    </Flex>
  );
};
