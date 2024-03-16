# ベースイメージ
FROM node:18

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
