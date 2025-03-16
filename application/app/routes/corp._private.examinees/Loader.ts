import { Exam, Examinee, ExamineeTag, ExamTag } from "@prisma/client";
import { prisma } from "../../services/db.server";

export type FetchedData = {
  examinees: LinkedExaminee[];
  tagsMaster: ExamineeTag[];
  examsMaster: LinkedExam[];
};

export type LinkedExaminee = Examinee & {
  tags: ExamineeTag[];
  exams: Exam[];
};

export type LinkedExam = Exam & {
  tags: ExamTag[];
};

// 受験者fetch
export const fetch = async () => {
  try {
    const examinees = await prisma.examinee.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        ExamineeTagging: {
          where: {
            deletedAt: null,
          },
          include: {
            examineeTag: true,
          },
        },
        ExamAttempt: {
          where: {
            deletedAt: null,
          },
          include: {
            exam: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const tagsMaster = await prisma.examineeTag.findMany({
      where: { deletedAt: null },
    });
    const examsMaster = await prisma.exam.findMany({
      where: { deletedAt: null },
      include: {
        ExamTagging: {
          where: {
            deletedAt: null,
          },
          include: {
            examTag: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const data = {
      examinees: examinees?.map((examinee) => {
        return {
          ...examinee,
          tags: examinee.ExamineeTagging?.map((tagging) => tagging.examineeTag),
          exams: examinee.ExamAttempt?.map((attempt) => attempt.exam),
        };
      }) as LinkedExaminee[],
      tagsMaster: tagsMaster as ExamineeTag[],
      examsMaster: examsMaster?.map((exam) => {
        return {
          ...exam,
          tags: exam.ExamTagging?.map((tagging) => tagging.examTag),
        };
      }) as LinkedExam[],
    };
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("データを取得できませんでした");
  }
};
