import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedExamQuestion = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany();

  let seed: Prisma.ExamQuestionCreateManyInput[] = [];
  exams.forEach((exam) => {
    const questions = Array(22)
      .fill(0)
      .map((_, i) => ({
        number: i + 1,
        question:
          "examQuestion.question" +
          i.toString() +
          `  
# h1  
## h2  
text`,
        type: i % 3,
        option: JSON.stringify({ sample: "sample" }),
        correctAnswer: JSON.stringify({ sample: "sample" }),
        jsonVersion: 1,
        examId: exam.id,
        deletedAt: i % 8 === 0 ? now : null,
        createdAt: now,
        updatedAt: now,
      }));
    seed = seed.concat(questions);
  });

  await prisma.examQuestion.createMany({
    data: seed,
  });
};
