
めも
- 各テーブルでcreated_at, updated_at, deleted_at カラムを持つ
  - ER図からは省略
  - 全部論理削除で扱う
- 受験者の回答や設問の設定はjson形式で保存している
  - jsonの定義は定義書作るまではコード見てもろて
- 試験や問題のバージョニングは不要
  - 最新のだけで出問したり集計したりでOK
- 設問タイプについて、0: テキスト、1: ラジオボタン、2: チェックボックス


```mermaid
erDiagram

examinees {
	number id "受験者"
	string name
	string email "unique"
	string password "hash値"
}
exam_attempts{
	number id "受験そのもの"
	number examinee_id "受験者"
	number exam_id "受験する試験"
	datetime started_at "受験開始日時"
	datetime ended_at "受験終了日時"
}
examinee_answers {
	number id "受験者の解答"
	number exam_attempt_id "受験"
	number exam_question_id "設問"
	json answer "解答内容"
}

exams {
	number id "試験"
	string title
	number time_limit "制限時間(分)"
}
exam_questions {
	number id "試験の設問"
	string question "問題文"
	number type "設問タイプ"
	json option "チェックボックスの選択肢などの情報"
	json collect_answer "正答"
	number json_version "設問定義のバージョン"
}

examinee_tagging {
	number id "受験者タグづけ"
	number examinee_id
	number examinee_tag_id
}
examinee_tags {
	number id "受験者用タグ"
	string name
}
exam_tagging {
	number id "試験タグづけ"
	number exam_id
	number exam_tag_master_id
}
exam_tags {
	number id "試験タグ"
	string name
}
exam_question_tagging {
	number id "設問タグづけ"
	number examinee_id
	number examinee_tag_id
}
exam_question_tags {
	number id "設問用タグ"
	string name
}

examinees ||--o{ exam_attempts : ""
exam_attempts ||--o| examinee_answers: ""
exam_attempts }o--|| exams: ""
exams ||--o{ exam_questions : "　"
examinee_answers }o--|| exam_questions : ""

examinees ||--o{ examinee_tagging : ""
examinee_tagging }o--|| examinee_tags : ""
exams ||--o{ exam_tagging : ""
exam_tagging }o--|| exam_tags : ""
exam_questions ||--o{ exam_question_tagging : ""
exam_question_tagging }o--|| exam_question_tags : ""

```