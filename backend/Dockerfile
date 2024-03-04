# ベースイメージ
FROM golang:1.16

# ワークディレクトリの設定
WORKDIR /app

# Goの依存関係管理ファイルをコピー
COPY go.mod ./
COPY go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN go build -o main .

# アプリケーションを起動
CMD ["./main"]
