import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedExamQuestion = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany();

  let seed: Prisma.ExamQuestionCreateManyInput[] = [];
  exams.forEach((exam) => {
    const questionsForExam = Array(12)
      .fill(0)
      .map((_, i) => ({
        question: "examQuestion.question" + i.toString(),
        type: i % 3,
        option: JSON.stringify({ sample: "sample" }),
        correctAnswer: JSON.stringify({ sample: "sample" }),
        jsonVersion: 1,
        examId: exam.id,
        deletedAt: i % 2 === 0 ? now : null,
        createdAt: now,
        updatedAt: now,
      }));
    seed = seed.concat(questionsForExam);
  });

  await prisma.examQuestion.createMany({
    data: seed,
  });
};
