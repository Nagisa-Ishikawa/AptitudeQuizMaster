/** 各画面へのパスを書く */
export const pages: Record<
  string,
  {
    name: string;
    path: string;
  }
> = {
  login: { name: "ログイン", path: "/login" },
  examQuestionList: { name: "問題一覧", path: "/exam/question-list" },
  examQuestion: { name: "問題", path: "/exam/question" },
};
