import { Examinee, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 受験者作成
export const seedExaminee = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany();

  let seed: Prisma.ExamineeCreateManyInput[] = [];
  exams.forEach((exam) => {
    const examinee = Array(3)
      .fill(0)
      .map(
        (_, i) =>
          ({
            name: exam.title + "受験太郎" + i.toString(),
            email: exam.title + "@" + i.toString(),
            password: "a",
            deletedAt: i % 3 === 0 ? now : null,
            createdAt: now,
            updatedAt: now,
          } as Prisma.ExamineeCreateManyInput)
      );
    seed = seed.concat(examinee);
  });

  await prisma.examinee.createMany({
    data: seed,
  });

  const examinees = await prisma.examinee.findMany();
  seedExamineeTag(isProd, now, examinees);
};

// 受験者タグ、受験者タグ付け作成
export const seedExamineeTag = async (
  isProd: boolean,
  now: Date,
  examinees: Examinee[]
) => {
  if (isProd) return;

  // 受験者タグ
  const examineeTagSeed = ["未経験者", "経験者", "新卒", "準新卒", "紹介"].map(
    (x, i) =>
      ({
        name: x,
        deletedAt: i % 3 === 0 ? now : null,
        createdAt: now,
        updatedAt: now,
      } as Prisma.ExamineeTagCreateManyInput)
  );

  await prisma.examineeTag.createMany({
    data: examineeTagSeed,
  });

  const examineeTags = await prisma.examineeTag.findMany();

  // 受験者タグ付け
  const examineeTagging = [
    { examineeId: examinees[0].id, examineeTagId: examineeTags[0].id },
    { examineeId: examinees[1].id, examineeTagId: examineeTags[1].id },
    { examineeId: examinees[1].id, examineeTagId: examineeTags[2].id },
    { examineeId: examinees[2].id, examineeTagId: examineeTags[3].id },
  ];
  const examineeTaggingSeed = examineeTagging.map(
    (x, i) =>
      ({
        examineeId: x.examineeId,
        examineeTagId: x.examineeTagId,
        deletedAt: i % 3 === 0 ? now : null,
        createdAt: now,
        updatedAt: now,
      } as Prisma.ExamineeTaggingCreateManyInput)
  );

  await prisma.examineeTagging.createMany({
    data: examineeTaggingSeed,
  });
};
