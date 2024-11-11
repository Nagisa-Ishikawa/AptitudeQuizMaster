# schema.prismaの内容からモデル型を作成する
generate:
	npx prisma generate

# マイグレーション schema.prismaの内容をDBに反映する
migrate:
	npx prisma migrate dev

# DBにseedデータ挿入
seed:
	npx tsx prisma/seed/seed.ts

# DBのデータ全削除
truncate:
	npx tsx prisma/truncate.ts

# storybook開始
story:
	npm run storybook