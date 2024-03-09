export async function login(email: string, password: string): Promise<number> {
  if (password === "error") {
    throw new Error("ログインに失敗しました");
  }
  // TODO: DBからuserを取得する処理
  return await 1;
}
