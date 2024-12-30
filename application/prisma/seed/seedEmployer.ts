import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedEmployer = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const seed = [
    {
      name: "divx",
      email: "employer@example.com",
      password: "a",
      createdAt: now,
      updatedAt: now,
    },
    {
      name: "divx2",
      email: "exam.title1@0",
      password: "a",
      createdAt: now,
      updatedAt: now,
    },
  ] as Prisma.EmployerCreateManyInput[];

  await prisma.employer.createMany({
    data: seed,
  });
};
