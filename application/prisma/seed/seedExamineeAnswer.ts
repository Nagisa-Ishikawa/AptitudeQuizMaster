import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedExamineeAnswer = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany({
    include: {
      examAttempts: true,
      examQuestions: true,
    },
  });

  const seed: Prisma.ExamineeAnswerCreateManyInput[] = [];
  exams.forEach((exam) => {
    const questions = exam.examQuestions;

    if (questions.length === 0) return;

    exam.examAttempts.forEach((examAttempt) => {
      questions.forEach((question, i) => {
        if (i % 5 === 0) return;

        seed.push({
          examAttemptId: examAttempt.id,
          examQuestionId: question.id,
          isMarked: question.id % 3 ? false : true,
          answer:
            question.id % 4 ? undefined : JSON.stringify({ sample: "sample" }),
          createdAt: now,
          updatedAt: now,
        });
      });
    });
  });

  await prisma.examineeAnswer.createMany({
    data: seed,
  });
};
