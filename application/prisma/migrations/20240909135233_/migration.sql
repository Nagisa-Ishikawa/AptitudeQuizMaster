/*
  Warnings:

  - You are about to drop the column `exam_end_date` on the `exam_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `exam_start_date` on the `exam_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `is_marked` on the `examinee_answers` table. All the data in the column will be lost.
  - You are about to drop the column `time_limit` on the `exams` table. All the data in the column will be lost.
  - Added the required column `time_limit` to the `exam_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exam_attempts" DROP COLUMN "exam_end_date",
DROP COLUMN "exam_start_date",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "exam_questions" ADD COLUMN     "time_limit" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "examinee_answers" DROP COLUMN "is_marked",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "examinees" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "exams" DROP COLUMN "time_limit";

-- CreateTable
CREATE TABLE "examinee_tagging" (
    "id" SERIAL NOT NULL,
    "examinee_id" INTEGER NOT NULL,
    "examinee_tag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "examinee_tagging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examinee_tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "examinee_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_tagging" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "exam_tag_master_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exam_tagging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exam_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_question_tagging" (
    "id" SERIAL NOT NULL,
    "exam_question_id" INTEGER NOT NULL,
    "exam_question_tag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exam_question_tagging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_question_tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exam_question_tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "examinee_tagging" ADD CONSTRAINT "examinee_tagging_examinee_id_fkey" FOREIGN KEY ("examinee_id") REFERENCES "examinees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examinee_tagging" ADD CONSTRAINT "examinee_tagging_examinee_tag_id_fkey" FOREIGN KEY ("examinee_tag_id") REFERENCES "examinee_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tagging" ADD CONSTRAINT "exam_tagging_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tagging" ADD CONSTRAINT "exam_tagging_exam_tag_master_id_fkey" FOREIGN KEY ("exam_tag_master_id") REFERENCES "exam_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_question_tagging" ADD CONSTRAINT "exam_question_tagging_exam_question_id_fkey" FOREIGN KEY ("exam_question_id") REFERENCES "exam_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_question_tagging" ADD CONSTRAINT "exam_question_tagging_exam_question_tag_id_fkey" FOREIGN KEY ("exam_question_tag_id") REFERENCES "exam_question_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
