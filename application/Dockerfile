# コンテナのベースイメージ指定
FROM node:18

# コンテナ内でbash使いたいのでインストール
RUN apt-get update && apt-get install -y --no-install-recommends bash

# アプリケーションディレクトリ作成
WORKDIR /app

# ライブラリをインストール
COPY package*.json ./
RUN npm install

# ローカルファイルをコンテナにコピー
COPY . .

# Prisma Clientの生成
RUN npx prisma generate

# アプリビルド
RUN npm run build

# アプリ起動
CMD ["npm","run","dev"]
