import { Expose } from "class-transformer";

/**
 * 回答エンティティ
 */
export class AnswerEntity {
  @Expose()
  public text?: {
    value: string;
  };

  @Expose()
  public radio?: {
    value: string;
  };

  @Expose()
  public checkBox?: {
    values: string[];
  };
}
