/** 各画面へのパスを書く */
export const Pages: Record<
  string,
  {
    name: string;
    path: string;
  }
> = {
  // 受験者用画面
  login: { name: "ログイン", path: "/login" },
  examStart: { name: "試験開始", path: "/exam/start" },
  examQuestion: { name: "問題", path: "/exam/question" },

  // 企業用画面
  corpLogin: { name: "企業ログイン", path: "/corp/login" },
  // ぜんぜん作ってない
};
