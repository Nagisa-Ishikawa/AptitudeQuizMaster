import { Button } from "@mantine/core";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { prisma } from "prisma/servers/db.server";
import { useEffect } from "react";

type User = {
  id: number;
};

/**
 * remixでは、GETメソッドはloaderという関数で行う
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // loader, actionのスクリプトはサーバー側で実行される
  console.log("🐟このログはサーバー側だけでるよ");

  // クッキーの読み込み
  const cookie = request.headers.get("Cookie");
  console.log("クッキーサンプル :", cookie);

  // クエリパラメータの取得
  const url = new URL(request.url);
  const query = url.searchParams.get("param_sample");
  console.log("クエリパラメータサンプル :", query);

  const data = await prisma.user.findMany();
  console.log("🤔data :", data);
  return json(data);
};

/**
 * remixでは、POST, PUT, DELETEメソッドはactionという関数で行う
 */
// export const action = async ({ request, params }: ActionFunctionArgs) => {};

/**
 * サンプルページ
 */
export default function SampleRoute() {
  // RemixはSSRなので、レンダリング（HTMLが作成）された後にクライアントに送信されるが、
  // クライアントでもスクリプトは実行される
  console.log("👉👈このログはクライアント側でもサーバー側でもでるよ");

  const data = useLoaderData<User[]>();

  return (
    <main>
      <div>サンプルページ</div>
      <div>フェッチしたデータ↓</div>
      <div>
        {data?.map((x, i) => (
          <div key={i}>{x.id}</div>
        ))}
      </div>
      <Button
        onClick={() => {
          // このonClickの関数はサーバーでのレンダリング時に実行されず、クライアントでのスクリプト実行時だけ表示される
          console.log("✅このログはクライアント側だけ出るよ");
        }}
      >
        ログサンプルボタン
      </Button>
    </main>
  );
}
