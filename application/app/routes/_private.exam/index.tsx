import { Exam, ExamQuestion, ExamineeAnswer } from "@prisma/client";
import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "../../services/db.server";
import { authenticator } from "../../services/auth.server";

// ExamQuestionモデルと、関連があるモデルを含んだ型
export type LinkedExamQuestion = ExamQuestion & {
  examAnswers: ExamineeAnswer[];
  exam: Exam;
};

export const loader: LoaderFunction = async ({ request }) => {
  const examineeId = await authenticator.isAuthenticated(request);
  const examinee = await prisma.examinee.findUniqueOrThrow({
    where: { id: examineeId as number },
  });

  // TODO: 論理削除実装する
  const data = await prisma.examQuestion.findMany({
    include: {
      examAnswers: true,
      exam: true,
    },
    where: {
      exam: {
        id: examinee?.examId,
      },
    },
  });

  return json(data);
};

/** _private.examパス下共通処理 */
export default function Index() {
  const data = useLoaderData<LinkedExamQuestion[]>();

  return <Outlet context={data} />;
}
