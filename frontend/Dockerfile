# ベースイメージ
FROM node:18

# bashインストール
RUN apt-get update && apt-get install -y --no-install-recommends bash

# アプリケーションディレクトリを作成
WORKDIR /app

# アプリケーションの依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースをバンドル
COPY . .

# ビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "run", "dev"]
