import { Exam, ExamQuestion, ExamineeAnswer } from "@prisma/client";
import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "../../services/db.server";

// ExamQuestionモデルと、関連があるモデルを含んだ型
export type LinkedExamQuestion = ExamQuestion & {
  examAnswers: ExamineeAnswer[];
  exam: Exam;
};

export const loader: LoaderFunction = async () => {
  // TODO: ユーザが受けるexamに絞る、論理削除実装する
  const data = await prisma.examQuestion.findMany({
    include: {
      examAnswers: true,
      exam: true,
    },
  });

  return json(data);
};

/** _private.examパス下共通処理 */
export default function Index() {
  const data = useLoaderData<LinkedExamQuestion[]>();

  return <Outlet context={data} />;
}
