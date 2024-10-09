dc = docker compose
# コンテナ立ち上げ
up:
	$(dc) up

# コンテナビルド Dockerfileをいじったらビルドし直す
build:
	$(dc) build --no-cache

# コンテナ内bash接続
app-sh:
	docker exec -it aptitude-quiz-master-app bash

# コンテナ内db接続
db:
	docker exec -it aptitude-quiz-master-db psql -U user -d postgres

# 1232ポートを利用しているアプリをkillする
.PHONY: kill
kill1232:
	@kill $$(lsof -ti:1232) 2>/dev/null || true
