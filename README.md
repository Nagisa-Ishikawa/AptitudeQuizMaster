# 技術構成

- パッケージ管理
  - Node.js 
    - ひとまずnpm利用で統一
- フロント
  - remix
    - vite系のFW
    - remixで用意されていないライブラリはviteで調達してね
  - Google Icons
- バックエンド
  - prisma
  - postgres


# セットアップ

- 誰かから.envファイルをもらい、applicationディレクトリ下に配置
- ローカルにNode.jsをインストール
  - バージョンは.node-version参照
- AptitudeQuizMasterディレクトリに移動、以下を実施
  - コンテナ起動
    - `docker-compose up`
  - appコンテナ接続
    - `docker exec -it aptitude-quiz-master-app bash`
    - 接続したまま以下を実行
      - マイグレーション
        - `npx prisma migrate dev`
      - 型定義生成
        - `npx prisma generate`
      - seed
        - `npx tsx prisma/seed/seed.ts`
- ローカルに戻り、 AptitudeQuizMaster/applicationディレクトリに移動
  - 依存関係インストール
    - `npm install`
  - 型定義生成
    - `npx prisma generate`
- ブラウザでアクセス・ログインできたらOK
  - `http://localhost:3000`
  - テストデータのログイン情報
    - email: `exam.title1@0`
    - password: `a`


## 注意事項

- node_modulesはdockerコンテナ内とローカルで共有していない
  - 新しくライブラリを追加したら、コンテナとローカルの両方で`npm install`する
  - prismaから生成した型定義はnode_modulesに入るため、prisma更新したらapp-shコンテナとローカル(applicationディレクトリ)の両方で`make migrate`・`make generate`する


# フォルダ構成
- AptitudeQuizMaster
  - .github
    - githubの設定置き場
  - .vscode
    - vscodeの設定置き場
  - application
    - app
      - components  
        - UIコンポーネント置き場
        - 処理を持たせてはいけない。見た目だけのコンポーネントにすること
      - routes  
        - ルーティング兼フロント兼バックエンド  
          - ここのフォルダに追加したファイルの名前で、ウェブページが追加される 
          - remixのルーティングはちょっとだいぶ独特なので要予習  
        - root.tsx            
          - ルートコンポーネント  
          - 全てのコンポーネントはここから読み込まれる
    - prisma
      - schema.prisma  
        - prismaのスキーマ定義
        - ここでDBのテーブル定義を行う
          - `make migrate`コマンドでDBに反映する
          - `make generate`コマンドでtsの型の定義を生成する
    - stories  
      - storybook（componentのサンプル表示する機能）関連置き場
      - `make story`でstorybook開始
  - doc
    - ドキュメント置き場


# コマンド

よく使いそうなコマンドは各Makefileに足してる


# コーディング規約

既存と足並み揃える感じでよしなにおねがします


