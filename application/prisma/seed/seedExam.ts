import { Exam, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const seedExam = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const seed = Array(3)
    .fill(0)
    .map(
      (_, i) =>
        ({
          title: "exam.title" + i.toString(),
          timeLimit: 200 + i,
          deletedAt: i % 9 === 0 ? now : null,
          createdAt: now,
          updatedAt: now,
        } as Exam)
    );

  await prisma.exam.createMany({
    data: seed,
  });
};
