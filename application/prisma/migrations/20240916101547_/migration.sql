/*
  Warnings:

  - You are about to drop the column `exam_tag_master_id` on the `exam_tagging` table. All the data in the column will be lost.
  - Added the required column `exam_tag_id` to the `exam_tagging` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exam_tagging" DROP CONSTRAINT "exam_tagging_exam_tag_master_id_fkey";

-- AlterTable
ALTER TABLE "exam_tagging" DROP COLUMN "exam_tag_master_id",
ADD COLUMN     "exam_tag_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "exam_tagging" ADD CONSTRAINT "exam_tagging_exam_tag_id_fkey" FOREIGN KEY ("exam_tag_id") REFERENCES "exam_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
