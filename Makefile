dc = docker-compose
# 立ち上げ
up:
	$(dc) up

# ビルド
# Dockerfileいじったらビルドし直す
build:
	$(dc) build --no-cache