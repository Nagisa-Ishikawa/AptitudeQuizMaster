import {
  Exam,
  ExamAttempt,
  ExamQuestion,
  Examinee,
  ExamineeAnswer,
} from "@prisma/client";
import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "../../services/auth.server";
import { prisma } from "../../services/db.server";

export type FetchedData = {
  examinee: Examinee;
  examAttempt: LinkedExamAttempt;
};

// 関連データを含んだ型
export type LinkedExamAttempt = ExamAttempt & {
  exam: LinkedExam;
};
export type LinkedExam = Exam & {
  examQuestions: LinkedExamQuestion[];
};
export type LinkedExamQuestion = ExamQuestion & {
  examineeAnswer?: ExamineeAnswer;
};

export const loader: LoaderFunction = async ({ request }) => {
  // 受験者・試験情報フェッチ
  const examineeId = await authenticator.isAuthenticated(request);
  const examinee = await prisma.examinee.findUniqueOrThrow({
    where: { id: examineeId as number },
  });

  const examAttemptId = (
    await prisma.examAttempt.findFirstOrThrow({
      where: {
        examineeId: examineeId as number,
      },
    })
  ).id;

  const linkedExamAttempt = await prisma.examAttempt.findFirstOrThrow({
    include: {
      exam: {
        include: {
          examQuestions: {
            where: {
              deletedAt: null,
            },
            orderBy: {
              number: "asc",
            },

            include: {
              examineeAnswers: {
                where: {
                  examAttemptId: examAttemptId,
                },
              },
            },
          },
        },
      },
    },
    where: {
      examineeId: examineeId as number,
    },
  });

  const linkedExamQuestions = linkedExamAttempt.exam.examQuestions.map(
    (question) => ({
      ...question,
      examineeAnswer: question.examineeAnswers[0],
    })
  );

  const examAttempt: LinkedExamAttempt = {
    ...linkedExamAttempt,
    exam: {
      ...linkedExamAttempt.exam,
      examQuestions: linkedExamQuestions,
    },
  };

  const data = {
    examinee: examinee,
    examAttempt: examAttempt,
  };

  return json(data);
};

/** _private.examパス下共通処理 */
export default function Index() {
  const data = useLoaderData<FetchedData>();

  return <Outlet context={data} />;
}
