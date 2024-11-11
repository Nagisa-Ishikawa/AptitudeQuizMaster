-- CreateTable
CREATE TABLE "examinees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "examinees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_attempts" (
    "id" SERIAL NOT NULL,
    "examinee_id" INTEGER NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exam_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_questions" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "option" JSONB,
    "collect_answer" JSONB,
    "json_version" INTEGER NOT NULL,
    "exam_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exam_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examinee_answers" (
    "id" SERIAL NOT NULL,
    "exam_question_id" INTEGER NOT NULL,
    "exam_attempt_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3),
    "answer" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "examinee_answers_pkey" PRIMARY KEY ("id")
);

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
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "examinee_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_tagging" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "exam_tag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exam_tagging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
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
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "exam_question_tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exam_attempts" ADD CONSTRAINT "exam_attempts_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_attempts" ADD CONSTRAINT "exam_attempts_examinee_id_fkey" FOREIGN KEY ("examinee_id") REFERENCES "examinees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_questions" ADD CONSTRAINT "exam_questions_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examinee_answers" ADD CONSTRAINT "examinee_answers_exam_question_id_fkey" FOREIGN KEY ("exam_question_id") REFERENCES "exam_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examinee_answers" ADD CONSTRAINT "examinee_answers_exam_attempt_id_fkey" FOREIGN KEY ("exam_attempt_id") REFERENCES "exam_attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examinee_tagging" ADD CONSTRAINT "examinee_tagging_examinee_id_fkey" FOREIGN KEY ("examinee_id") REFERENCES "examinees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examinee_tagging" ADD CONSTRAINT "examinee_tagging_examinee_tag_id_fkey" FOREIGN KEY ("examinee_tag_id") REFERENCES "examinee_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tagging" ADD CONSTRAINT "exam_tagging_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tagging" ADD CONSTRAINT "exam_tagging_exam_tag_id_fkey" FOREIGN KEY ("exam_tag_id") REFERENCES "exam_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_question_tagging" ADD CONSTRAINT "exam_question_tagging_exam_question_id_fkey" FOREIGN KEY ("exam_question_id") REFERENCES "exam_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_question_tagging" ADD CONSTRAINT "exam_question_tagging_exam_question_tag_id_fkey" FOREIGN KEY ("exam_question_tag_id") REFERENCES "exam_question_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
