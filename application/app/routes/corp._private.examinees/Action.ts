import { v4 as uuidv4 } from "uuid";
import { defaultExamineeTagColor } from "../../consts/tags";
import { prisma } from "../../services/db.server";

// 受験者upsert
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RegisterAction = async (formData: any, now: Date) => {
  await prisma.$transaction(async (prisma) => {
    const examineeId = parseInt(formData.get("id") || "0");

    const examineeTagsIds = await getOrCreateExamineeTagsIds(
      formData.get("tags"),
      now
    );
    const examinee = await upsertExaminee(examineeId, formData, now);
    await updateExamineeTagging(examinee.id, examineeTagsIds, now);
    await updateExamAttempt(examinee.id, parseInt(formData.get("exam")), now);
  });
};

const getOrCreateExamineeTagsIds = async (tags: string, now: Date) => {
  return await Promise.all(
    tags.trim() === ""
      ? []
      : tags.split(",")?.map(async (x: string) => {
          const examineeTag = await prisma.examineeTag.findFirst({
            where: {
              name: x,
              deletedAt: null,
            },
          });
          if (examineeTag) return examineeTag.id;
          // タグが存在しなければ作成
          const createdExamineeTag = await prisma.examineeTag.create({
            data: {
              name: x,
              color: defaultExamineeTagColor,
              createdAt: now,
              updatedAt: now,
            },
          });
          return createdExamineeTag.id;
        })
  );
};

const upsertExaminee = async (examineeId: number, formData: any, now: Date) => {
  return await prisma.examinee.upsert({
    where: {
      id: examineeId,
    },
    create: {
      name: formData.get("name"),
      email: formData.get("email"),
      note: formData.get("note"),
      password: uuidv4(),
      createdAt: now,
      updatedAt: now,
    },
    update: {
      name: formData.get("name"),
      email: formData.get("email"),
      note: formData.get("note"),
      updatedAt: now,
    },
  });
};

const updateExamineeTagging = async (
  examineeId: number,
  examineeTagsIds: number[],
  now: Date
) => {
  await prisma.examineeTagging.deleteMany({
    where: {
      examineeId: examineeId,
    },
  });
  await prisma.examineeTagging.createMany({
    data: examineeTagsIds.map((id) => ({
      examineeId: examineeId,
      examineeTagId: id,
      createdAt: now,
      updatedAt: now,
    })),
  });
};

const updateExamAttempt = async (
  examineeId: number,
  examId: number,
  now: Date
) => {
  await prisma.examAttempt.deleteMany({
    where: {
      examineeId: examineeId,
    },
  });
  if (examId) {
    await prisma.examAttempt.create({
      data: {
        examId: examId,
        examineeId: examineeId,
        createdAt: now,
        updatedAt: now,
      },
    });
  }
};
