# ベースイメージ
FROM golang:1.19

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
# RUN go build -o main .
# RUN go build -o main ./cmd/main.go
# RUN go build -o main ./cmd
RUN go build -o main ./cmd

# アプリケーションを起動
CMD ["./main"]
