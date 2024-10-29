/** 各画面へのパスを書く */
export const pages: Record<
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
  examCompletion: { name: "試験終了", path: "/exam/completion" },

  // 企業用画面
  corpLogin: { name: "企業ログイン", path: "/corp/login" },
  corpHome: { name: "ホーム", path: "/corp/home" },
  corpExaminees: { name: "受験者管理", path: "/corp/examinees" },
  corpQuestions: { name: "問題管理", path: "/corp/questions" },
  corpExams: { name: "試験管理", path: "/corp/exams" },
  corpScores: { name: "成績集計", path: "/corp/scores" },
  corpSettings: { name: "設定", path: "/corp/settings" },
};
