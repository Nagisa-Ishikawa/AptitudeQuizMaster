/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { seedEmployer } from "./seedEmployer";
import { seedExam } from "./seedExam";
import { seedExamAttempt } from "./seedExamAttempt";
import { seedExamQuestion } from "./seedExamQuestion";
import { seedExaminee } from "./seedExaminee";
import { seedExamineeAnswer } from "./seedExamineeAnswer";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  console.log("seed開始🌱 NODE_ENV: ", process.env.NODE_ENV);
  const isProd = process.env.NODE_ENV === "production";

  // 既存レコード削除
  await prisma.examTagging.deleteMany({});
  await prisma.examTag.deleteMany({});
  await prisma.examineeTagging.deleteMany({});
  await prisma.examineeTag.deleteMany({});
  await prisma.examQuestionTagging.deleteMany({});
  await prisma.examQuestionTag.deleteMany({});
  await prisma.examineeAnswer.deleteMany({});
  await prisma.examAttempt.deleteMany({});
  await prisma.examinee.deleteMany({});
  await prisma.examQuestion.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.employer.deleteMany({});

  // レコード挿入
  await seedEmployer(isProd, now);
  await seedExam(isProd, now);
  await seedExamQuestion(isProd, now);
  await seedExaminee(isProd, now);
  await seedExamAttempt(isProd, now);
  await seedExamineeAnswer(isProd, now);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log("seed終了🌾");
  });
