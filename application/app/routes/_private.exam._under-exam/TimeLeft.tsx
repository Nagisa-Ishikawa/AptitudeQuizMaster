import { useOutletContext } from "@remix-run/react";
import { addSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { TimeLeft as TimeLeftComponent } from "../../components/Progress/TimeLeftProgress";
import { calculateRemainingTime } from "../../functions/calculateRemainingTime";
import { FetchedData } from "../_private.exam";

// 残り時間
export const TimeLeft: React.FC = () => {
  const data = useOutletContext() as FetchedData;

  const [currentTime, setCurrentTime] = useState(new Date());
  if (!data?.examAttempt?.startDate) {
    throw new Error("試験を開始してください");
  }
  const examStartDate = new Date(data.examAttempt.startDate);

  const timeLimit = data.examAttempt.exam.examQuestions.reduce(
    (acc, cur) => acc + cur.timeLimit,
    0
  );

  const [remainingTime, remainingPercentage] = calculateRemainingTime(
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
    <TimeLeftComponent
      perOfElapsed={100 - remainingPercentage}
      leftTime={remainingTime}
    />
  );
};
