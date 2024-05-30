import { Exam, ExamQuestion, Examinee, ExamineeAnswer } from "@prisma/client";
import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "../../services/db.server";
import { authenticator } from "../../services/auth.server";

export type FetchedData = {
  examinee: Examinee;
  exam: Exam;
  examQuestions: LinkedExamQuestion[];
};

// ExamQuestionモデルと、関連があるモデルを含んだ型
export type LinkedExamQuestion = ExamQuestion & {
  examineeAnswers: ExamineeAnswer[];
};

export const loader: LoaderFunction = async ({ request }) => {
  // 受験者・試験情報フェッチ
  const examineeId = await authenticator.isAuthenticated(request);
  const examinee = await prisma.examinee.findUniqueOrThrow({
    where: { id: examineeId as number },
  });
  const exam = await prisma.exam.findUniqueOrThrow({
    where: { id: examinee.examId as number, deletedAt: null },
  });

  const examQuestions = await prisma.examQuestion.findMany({
    include: {
      examineeAnswers: true,
    },
    where: {
      deletedAt: null,
      exam: {
        id: examinee.examId,
      },
    },
  });

  const data = {
    examinee: examinee,
    exam: exam,
    examQuestions: examQuestions,
  };

  return json(data);
};

/** _private.examパス下共通処理 */
export default function Index() {
  const data = useLoaderData<FetchedData>();

  return <Outlet context={data} />;
}
