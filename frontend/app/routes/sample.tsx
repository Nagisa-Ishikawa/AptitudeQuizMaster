import { Button } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

/**
 * remixでは、GETメソッドはloaderという関数で行う
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // loader, actionのスクリプトはサーバー側で実行される
  console.log("🐟このログはサーバー側だけでるよ");

  // クッキーの読み込み
  const cookie = request.headers.get("Cookie");

  // クエリパラメータの取得
  const url = new URL(request.url);
  const query = url.searchParams.get("param_sample");
  console.log("クエリパラメータ param_sample :", query);

  const res = await fetch("http://backend:1323/aaa");
  return res;

  // 他のやりかたもあるよの例
  //   // fetch("https://any/path").then((res)=>res.json()) と同じ
  //   // json()の返り値が、クライアントに送信される
  //   return json({ any: "thing" });

  //   // const res:Response = fetch("https://any/path") と同じ
  //   // Responseの値が、クライアントに送信される
  //   return new Response(JSON.stringify({ any: "thing" }), {
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //   });
};

/**
 * サンプルページ
 */
export default function SampleRoute() {
  // RemixはSSRなので、レンダリング（HTMLが作成）された後にクライアントに送信されるが、
  // クライアントでもスクリプトは実行される
  console.log("👉👈このログはクライアント側でもサーバー側でもでるよ");

  const fetchedData = useLoaderData<typeof loader>();

  return (
    <main>
      <div>サンプルページ</div>
      <div>フェッチしたデータ↓</div>
      <div>{fetchedData}</div>
      <Button
        onClick={() => {
          // このログはサーバーでのレンダリング時に実行されず、クライアントでのスクリプト実行時だけ表示される
          console.log("✅このログはクライアント側だけ出るよ");
        }}
      >
        ボタン
      </Button>
    </main>
  );
}
