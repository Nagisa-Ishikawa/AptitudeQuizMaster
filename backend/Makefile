# マイグレーション実行
# TODO: あとで環境変数切り出し
migrate:
	migrate -database "postgres://user:password@localhost:5432/aptitude-quiz-master?sslmode=disable" -path ./src/db/migrations up
# 依存関係整理
mt:
	go mod tidy
