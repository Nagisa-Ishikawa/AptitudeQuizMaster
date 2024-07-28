
めも
- examinees
  - 今のところcognitoは検討していない
    - 金かかる
    - そこまでセキュリティガチらなくていい
    - ユーザ設定をずっと使うわけではないので、パスワード再設定機能等がオーバースペック
  - 人事アプリとの連携を念頭に置く
- exams
  - 過去に受験した試験内容を変えてしまわないよう、論理削除で扱う
  - 出題順やカテゴリーなどの情報も追加していきたいかも
- exam_questions
  - type
    - チェックボックス | ラジオボタン | テキスト
    - 並べ変えリストとか画像のアップロードも追加していきたいかも
  - option
    - jsonで、どんな選択肢があるかを定義

※ 各テーブルcreated_at, updated_at 略
※ 各jsonについては定義書参照


```mermaid
erDiagram
	examinees {
		number id "試験の受験者"
		string name
		string email
		string password "hash値"
	}
	examinee_tags {
		number id "受験者につけるタグ"
		number examinee_id
		number examinee_tag_master_id
	}
	examinee_tag_masters {
		number id "受験者につけるタグのマスタ"
	}
	exam_attempts{
		number id "受験"
		number examinee_id "受験者"
		number exam_id "試験"
		datetime exam_start_date "受験開始日"
		datetime exam_end_date "受験終了日"
	}
	examinee_answers {
		number id "試験の解答"
		number exam_attempt_id "受験"
		number exam_question_id "設問"
		json answer "解答"
		boolean is_marked "後で見るマーク"
	}
	exams {
		number id "試験"
		string title
		number time_limit "制限時間(分)"
		datetime deleted_at
	}
	exam_tags {
		number id "試験につけるタグ"
		number exam_id
		number exam_tag_master_id
	}
	exam_tag_masters {
		number id "試験につけるタグのマスタ"
	}
	exam_questions {
		number id "試験の設問"
		string question "問題文"
		number type "設問タイプ"
		json option "チェックボックスの選択肢などの情報"
		json collect_answer "正答"
		number json_version "設問定義のバージョン"
		datetime deleted_at
	}
	exam_question_tags {
		number id "タグ紐づけ"
		number examinee_id
		number examinee_tag_master_id
	}
	exam_question_tag_masters {
		number id "タグのマスタ"
	}

	examinees ||--|{ exam_attempts : ""
	exam_attempts ||--o| examinee_answers: ""
	exam_attempts }o--|| exams: ""
	exams ||--o{ exam_questions : "has"
	examinee_answers }o--|| exam_questions : ""

	examinees ||--o{ examinee_tags : ""
	examinee_tags }o--|| examinee_tag_masters : ""
	exam_question_tags ||--o{ exam_questions : ""
	exam_question_tags }o--|| exam_question_tag_masters : ""
	exam_tags ||--o{ exams : ""
	exam_tags }o--|| exam_tag_masters : ""
	
	

```