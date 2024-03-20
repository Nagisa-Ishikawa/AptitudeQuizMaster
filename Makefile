dc = docker-compose
# 立ち上げ
up:
	$(dc) up

# ビルド
# Dockerfileをいじったらビルドし直す
build:
	$(dc) build --no-cache

# コンテナ内bash起動
front-sh:
	docker exec -it aptitude-quiz-master-frontend bash
back-sh:
	docker exec -it aptitude-quiz-master-backend bash