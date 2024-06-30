

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
- コンテナ起動
  - `docker-compose up`
- appコンテナ接続
  - `docker exec -it aptitude-quiz-master-app bash`
- appコンテナでマイグレーション
  - (appコンテナに接続したまま)`npx prisma migrate dev`
- appコンテナでseed
  -  (appコンテナに接続したまま)`npx tsx prisma/seed/seed.ts`
- ブラウザでアクセスできたらOK！
  - `http://localhost:3000`
  - テストデータのログイン情報
    - email: `exam.title1@0`
    - password: `a`


# フォルダ構成
- AptitudeQuizMaster
  - doc
    - ER図とか仕様書を入れる
  - application  
    アプリのフォルダ  
    同じ階層にdocやinfraフォルダを掘るのを想定して一段階掘ってる
    - app
      - components  
        - いろんなところで使いそうなUIパーツのみを格納するフォルダ
        - コンポーネントを追加したらstoriesも更新する
      - routes  
        - ページルーティングするフォルダ  
          - ここのフォルダに追加したファイルの名前で、ウェブページが追加される 
          - remixのルーティングはちょっと独特なので要予習  
          - remixはルーティングも描画もdb接続も同じファイルでやるので、ここをメインでいじることになりそう
        - root.tsx            
          - ルートコンポーネント  
          - 全てのコンポーネントはここから読み込まれる
    - prisma
      - schema.prisma  
        - prismaのスキーマファイル  
        - ここでDBのテーブル定義を行い、`make migrate`コマンドでDBに反映する  `make generate`コマンドでtsの型の定義を生成する
    - stories  
      - storybookのファイルを格納するフォルダ 
      - `make story`でstorybook開始



# コマンド

よく使いそうなコマンドはMakefileに足してるのでそちら参照
「このコマンドって何ですか？説明してください」ってGPTにぶち込んでください


# コーディング規約

# その他

## 注意事項
- node_modulesはdockerコンテナ内とローカルで共有していない
  - 新しくライブラリを追加したら、コンテナとローカルの両方で`npm install`する
  - prismaから生成した型定義はnode_modulesに入るため、prisma更新したらコンテナとローカルの両方で`make migrate`する