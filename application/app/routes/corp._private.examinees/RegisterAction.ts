import { v4 as uuidv4 } from "uuid";
import { defaultExamineeTagColor } from "../../consts/tags";
import { prisma } from "../../services/db.server";

// 受験者upsert
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RegisterAction = async (formData: any, now: Date) => {
  await prisma.$transaction(async (prisma) => {
    const examineeId = parseInt(formData.get("id") || "0");

    // 受験者タグマスタ更新
    const examineeTagsNames = formData.get("tags");
    const examineeTagsIds = await Promise.all(
      examineeTagsNames.trim() === ""
        ? []
        : examineeTagsNames.split(",")?.map(async (x: string) => {
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

    // 受験者作成 or 更新
    const examinee = await prisma.examinee.upsert({
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

    // 受験者タグ付け更新
    // 全部削除 -> 作成 で更新する
    await prisma.examineeTagging.deleteMany({
      where: {
        examineeId: examineeId,
      },
    });
    await prisma.examineeTagging.createMany({
      data: examineeTagsIds.map((id) => ({
        examineeId: examinee.id,
        examineeTagId: id,
        createdAt: now,
        updatedAt: now,
      })),
    });

    // 受験作成
    // 全部削除 -> 作成 で更新する
    // ※受験履歴がすでにあれば、削除に失敗する
    const examId = parseInt(formData.get("exam"));
    await prisma.examAttempt.deleteMany({
      where: {
        examineeId: examinee.id,
      },
    });
    if (examId) {
      await prisma.examAttempt.create({
        data: {
          examId: examId,
          examineeId: examinee.id,
          createdAt: now,
          updatedAt: now,
        },
      });
    }
  });
};
