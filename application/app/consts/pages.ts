/** 各画面へのパスを書く */
export const pages: Record<
  string,
  {
    name: string;
    path: string;
  }
> = {
  login: { name: "ログイン", path: "/login" },
  examQuestion: { name: "問題", path: "/exam/question" },
};
