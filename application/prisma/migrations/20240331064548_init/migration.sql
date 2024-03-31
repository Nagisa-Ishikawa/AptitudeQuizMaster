-- CreateTable
CREATE TABLE "examinees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "exam_period_start_date" TIMESTAMP(3) NOT NULL,
    "exam_period_end_date" TIMESTAMP(3) NOT NULL,
    "exam_start_date" TIMESTAMP(3),
    "exam_end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "examinees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "option" JSONB,
    "collect_answer" JSONB,
    "json_version" INTEGER NOT NULL,
    "exam_id" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examinee_answers" (
    "id" SERIAL NOT NULL,
    "examinee_id" INTEGER NOT NULL,
    "exam_question_id" INTEGER NOT NULL,
    "answer" JSONB,
    "is_marked" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "examinee_answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "examinees" ADD CONSTRAINT "examinees_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_questions" ADD CONSTRAINT "exam_questions_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examinee_answers" ADD CONSTRAINT "examinee_answers_examinee_id_fkey" FOREIGN KEY ("examinee_id") REFERENCES "examinees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examinee_answers" ADD CONSTRAINT "examinee_answers_exam_question_id_fkey" FOREIGN KEY ("exam_question_id") REFERENCES "exam_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
