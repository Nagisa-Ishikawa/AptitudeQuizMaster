import { Expose } from "class-transformer";

/**
 * 問題のオプションエンティティ
 * 回答選択肢等を定義する
 */
export class QuestionOptionEntity {
  @Expose()
  radio?: { choices: { label: string; value: string }[] };

  @Expose()
  checkBox?: { choices: { label: string; value: string }[] };
}
