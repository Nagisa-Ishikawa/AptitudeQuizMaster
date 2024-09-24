import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 受験作成
export const seedExamAttempt = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany();
  const examinees = await prisma.examinee.findMany();

  let seed: Prisma.ExamAttemptCreateManyInput[] = [];
  exams.forEach((exam) => {
    examinees.forEach((examinee, i) => {
      const examAttempt = {
        examineeId: examinee.id,
        examId: exam.id,
        startDate: now,
        endDate: undefined,
        deletedAt: i % 8 === 0 ? now : undefined,
        createdAt: now,
        updatedAt: now,
      } as Prisma.ExamAttemptCreateManyInput;
      seed = seed.concat(examAttempt);
    });
  });

  await prisma.examAttempt.createMany({
    data: seed,
  });
};
