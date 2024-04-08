import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedExamineeAnswer = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany({
    include: {
      examinees: true,
      examQuestions: true,
    },
  });

  const seed: Prisma.ExamineeAnswerCreateManyInput[] = [];
  exams.forEach((exam) => {
    const questions = exam.examQuestions;

    if (questions.length === 0) return;

    exam.examinees.forEach((examinee) => {
      questions.forEach((question) => {
        seed.push({
          examineeId: examinee.id,
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
