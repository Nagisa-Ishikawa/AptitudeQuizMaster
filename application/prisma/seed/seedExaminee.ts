import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedExaminee = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany();

  let seed: Prisma.ExamineeCreateManyInput[] = [];
  exams.forEach((exam) => {
    const examinee = Array(3)
      .fill(0)
      .map((_, i) => ({
        name: exam.title + "受験太郎" + i.toString(),
        email: exam.title + "@" + i.toString(),
        password: "a",
        createdAt: now,
        updatedAt: now,
      }));
    seed = seed.concat(examinee);
  });

  await prisma.examinee.createMany({
    data: seed,
  });
};
