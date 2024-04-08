import { Prisma, PrismaClient } from "@prisma/client";
import { addMinutes } from "date-fns";
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
        examId: exam.id,
        examPeriodStartDate: addMinutes(now, i * 100),
        examPeriodEndDate: addMinutes(now, i * 200),
        examStartDate: now,
        createdAt: now,
        updatedAt: now,
      }));
    seed = seed.concat(examinee);
  });

  await prisma.examinee.createMany({
    data: seed,
  });
};
