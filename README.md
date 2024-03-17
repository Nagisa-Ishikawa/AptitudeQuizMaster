# 技術構成

- パッケージ管理
  - Node.js
- フロント
  - ts
  - remix

# フォルダ構成
- AptitudeQuizMaster
  - backend
    - cmd コマンド
    - api server.goから呼び出されるAPIの内容
  - frontend
    - app
      - root.tsx ルートコンポーネント 全てのコンポーネントはここから読み込まれる
      - routes ページルーティングする ここのフォルダに追加したファイルの名前で、ウェブページが追加される




# コマンド

※よく使いそうなコマンドはMakefileに足してるのでそちら参照


コンテナビルド
```
docker-compose build --no-cache
```

コンテナ起動
```
docker-compose up
```

