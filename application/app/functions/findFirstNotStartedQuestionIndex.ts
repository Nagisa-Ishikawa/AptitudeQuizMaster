import { LinkedExamAttempt } from "../routes/_private.exam";

/**
 * 回答開始前の問題のインデックスを取得する
 * 回答開始前の問題がなければ-1を返す
 * @param examAttempt 受験
 * @returns 回答開始前の問題のインデックス
 */
export function findFirstNotStartedQuestionIndex(
  examAttempt: LinkedExamAttempt
): number {
  return examAttempt.exam.examQuestions.findIndex(
    (x) => !x.examineeAnswer?.startDate
  );
}
