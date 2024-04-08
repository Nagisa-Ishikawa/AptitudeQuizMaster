import { differenceInSeconds } from "date-fns";

/**
 * 試験の残り時間を計算
 * @param examStartDate 試験開始日時
 * @param currentTime 現在日時
 * @param timeLimit 試験時間(分)
 * @returns [mm:ss形式の残り時間, 残り時間の割合]
 */
export function useCalculateRemainingTime(
  examStartDate: Date,
  currentTime: Date,
  timeLimit: number
): [string, number] {
  const passedSeconds = differenceInSeconds(currentTime, examStartDate);
  if (passedSeconds < 0) return ["00:00", 0];

  const timeLimitSeconds = timeLimit * 60;

  const remainingSeconds = timeLimitSeconds - passedSeconds;
  if (remainingSeconds < 0) return ["00:00", 0];

  const remainingTimeFormatted = `${Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0")}:${(remainingSeconds % 60).toString().padStart(2, "0")}`;
  const remainingPercentage = (remainingSeconds / timeLimitSeconds) * 100;

  return [remainingTimeFormatted, remainingPercentage];
}
