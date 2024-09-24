import { Prisma, PrismaClient } from "@prisma/client";
import { questionType } from "../../app/consts/questionType";
import { QuestionOptionEntity } from "../../app/entities/QuestionOptionEntity";

const prisma = new PrismaClient();

// 試験問題作成
export const seedExamQuestion = async (isProd: boolean, now: Date) => {
  if (isProd) return;

  const exams = await prisma.exam.findMany();

  let seed: Prisma.ExamQuestionCreateManyInput[] = [];
  exams.forEach((exam) => {
    const questions = Array(22)
      .fill(0)
      .map((_, i) => ({
        number: i + 1,
        question:
          "examQuestion.question" +
          i.toString() +
          `  
# h1  
## h2  
text`,
        timeLimit: 20 + (i % 3),
        type: i % 3,
        option:
          i % 3 === questionType.checkBox
            ? JSON.stringify({
                checkBox: {
                  choices: [
                    { value: "0", label: "国語" },
                    { value: "1", label: "数学" },
                    { value: "2", label: "理科" },
                    { value: "3", label: "社会" },
                  ],
                },
              } as QuestionOptionEntity)
            : i % 3 === questionType.radio
            ? JSON.stringify({
                radio: {
                  choices: [
                    { value: "aaa", label: "火事" },
                    { value: "bbb", label: "地震" },
                    { value: "ccc", label: "津波" },
                  ],
                },
              } as QuestionOptionEntity)
            : undefined,

        correctAnswer: JSON.stringify({ sample: "sample" }),
        jsonVersion: 1,
        examId: exam.id,
        deletedAt: i % 8 === 0 ? now : null,
        createdAt: now,
        updatedAt: now,
      }));
    seed = seed.concat(questions);
  });

  await prisma.examQuestion.createMany({
    data: seed,
  });
};
