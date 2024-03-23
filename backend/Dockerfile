# コンテナのベースイメージ指定
FROM golang:1.22

# コンテナ内でbash使いたいのでインストール
RUN apt-get update && apt-get install -y --no-install-recommends bash

# ワークディレクトリ設定
WORKDIR /app

# ローカルファイルをコンテナにコピー
COPY . .

# Goのライブラリ依存関係管理ファイルコピー、インストール
RUN go install github.com/cosmtrek/air@latest
COPY go.mod ./
COPY go.sum ./
RUN go mod tidy
RUN go mod download


# アプリビルド
RUN go build -o main ./cmd

# アプリ起動
CMD ["air"]
