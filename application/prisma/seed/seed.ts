import { PrismaClient } from "@prisma/client";
import { seedExam } from "./seedExam";
import { seedExamQuestion } from "./seedExamQuestion";
import { seedExaminee } from "./seedExaminee";
const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const isProd = process.env.NODE_ENV === "production";

  // 既存レコード削除
  await prisma.examineeAnswer.deleteMany({});
  await prisma.examinee.deleteMany({});
  await prisma.examQuestion.deleteMany({});
  await prisma.exam.deleteMany({});

  // レコード挿入
  await seedExam(isProd, now);
  await seedExamQuestion(isProd, now);
  await seedExaminee(isProd, now);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
