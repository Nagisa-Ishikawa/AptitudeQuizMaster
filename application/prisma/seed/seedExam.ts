import { Exam, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 試験作成
export const seedExam = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  // 試験
  const examSeeds = Array(3)
    .fill(0)
    .map(
      (_, i) =>
        ({
          title: "exam.title" + i.toString(),
          deletedAt: i % 2 === 0 ? now : null,
          createdAt: now,
          updatedAt: now,
        } as Prisma.ExamCreateManyInput)
    );
  await prisma.exam.createMany({
    data: examSeeds,
  });
  const exams = await prisma.exam.findMany();
  seedExamTag(isProd, now, exams);
};

// 試験タグ、試験タグ付け作成
const seedExamTag = async (isProd: boolean, now: Date, exams: Exam[]) => {
  if (isProd) return;

  // 試験タグ
  const examTagSeed = [
    "未経験者",
    "経験者",
    "中途",
    "新卒",
    "2024新卒",
    "2025新卒",
  ].map(
    (x, i) =>
      ({
        name: x,
        deletedAt: i % 5 === 0 ? now : null,
        createdAt: now,
        updatedAt: now,
      } as Prisma.ExamTagCreateManyInput)
  );
  await prisma.examTag.createMany({
    data: examTagSeed,
  });
  const examTags = await prisma.examTag.findMany();

  // 試験タグ付け
  const exanTagging = [
    { examId: exams[0].id, examTagId: examTags[0].id },
    { examId: exams[1].id, examTagId: examTags[1].id },
    { examId: exams[1].id, examTagId: examTags[2].id },
    { examId: exams[2].id, examTagId: examTags[3].id },
  ];
  const examTaggingSeed = exanTagging.map(
    (x, i) =>
      ({
        examId: x.examId,
        examTagId: x.examTagId,
        deletedAt: i % 3 === 0 ? now : null,
        createdAt: now,
        updatedAt: now,
      } as Prisma.ExamTaggingCreateManyInput)
  );
  await prisma.examTagging.createMany({
    data: examTaggingSeed,
  });
};
