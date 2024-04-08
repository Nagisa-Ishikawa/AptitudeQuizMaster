
めも
- examinees
  - いち受験でいちユーザ振り出す
    - 同じ人が何度も受験した場合、都度振り出される
  - 今のところcognitoは検討していない
    - 金かかる
    - そこまでセキュリティガチらなくていい
    - ユーザの発行が手間
    - ユーザ設定をずっと使うわけではないので、パスワード再設定機能等がオーバースペック
  - 同じ人が何度も受験することは想定するように
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
		number exam_id "受験する試験"
		datetime exam_period_start_date "受験可能期間開始日"
		datetime exam_period_end_date　"受験可能期間終了日"
		datetime exam_start_date "受験開始日"
		datetime exam_end_date "受験終了日"
	}
	examinee_answers {
		number id "試験の解答"
		number examinee_id "解答者"
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
	exam_questions {
		number id "試験の設問"
		string question "問題文"
		number type "設問タイプ"
		json option "チェックボックスの選択肢などの情報"
		json collect_answer "正答"
		number json_version "設問定義のバージョン"
		datetime deleted_at
	}

	examinees }o--|| exams : ""
	examinees ||--o| examinee_answers: ""
	exams ||--o{ exam_questions : "has"
	examinee_answers }o--|| exam_questions : ""
	

```