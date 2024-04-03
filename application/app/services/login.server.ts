import { prisma } from "./db.server";

export async function login(email: string, password: string): Promise<number> {
  const user = await prisma.examinee.findFirst({
    where: { email: email, password: password },
  });

  if (!user) {
    throw new Error("ログインに失敗しました");
  } else {
    return user.id;
  }
}
