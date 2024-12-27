import { v4 as uuidv4 } from "uuid";
import { defaultExamineeTagColor } from "../../consts/tags";
import { prisma } from "../../services/db.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CreateExaminee = async (formData: any, now: Date) => {
  await prisma.$transaction(async (prisma) => {
    // 受験者タグマスタ更新
    const examineeTagsName = formData.get("tags");
    const examineeTagsId = await Promise.all(
      examineeTagsName?.split(",")?.map(async (x: string) => {
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

    // 受験者作成
    const examinee = await prisma.examinee.create({
      data: {
        name: formData.get("name"),
        email: formData.get("email"),
        note: formData.get("note"),
        password: uuidv4(),
        createdAt: now,
        updatedAt: now,
        ExamineeTagging: {
          createMany: {
            data: examineeTagsId.map((id) => ({
              examineeTagId: id,
              createdAt: now,
              updatedAt: now,
            })),
          },
        },
      },
    });

    // 試験が指定されていれば、受験作成
    const examId = parseInt(formData.get("exam"));
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
