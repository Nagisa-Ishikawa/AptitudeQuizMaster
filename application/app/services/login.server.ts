import { prisma } from "./db.server";

export async function login(email: string, password: string): Promise<number> {
  const examinee = await prisma.examinee.findFirst({
    where: { email: email, password: password },
  });

  if (!examinee) {
    throw new Error("ログインに失敗しました");
  } else {
    return examinee.id;
  }
}
