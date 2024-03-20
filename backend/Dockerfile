# ベースイメージ
FROM golang:1.19

# bashインストール
RUN apt-get update && apt-get install -y --no-install-recommends bash

# ワークディレクトリの設定
WORKDIR /app

# ソースコードをコピー
COPY . .

# Goの依存関係管理ファイルをコピー
RUN go mod tidy
COPY go.mod ./
COPY go.sum ./

RUN go mod download


# アプリケーションをビルド
RUN go build -o main ./cmd

# アプリケーションを起動
CMD ["./main"]
