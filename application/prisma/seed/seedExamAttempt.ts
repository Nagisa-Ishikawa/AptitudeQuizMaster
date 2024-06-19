import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedExamAttempt = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany();
  const examinees = await prisma.examinee.findMany();

  let seed: Prisma.ExamAttemptCreateManyInput[] = [];
  exams.forEach((exam) => {
    examinees.forEach((examinee) => {
      const examAttempt = {
        examineeId: examinee.id,
        examId: exam.id,
        examStartDate: now,
        examEndDate: undefined,
        createdAt: now,
        updatedAt: now,
      };
      seed = seed.concat(examAttempt);
    });
  });

  await prisma.examAttempt.createMany({
    data: seed,
  });
};
