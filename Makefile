.PHONY: setup up dev migrate seed test verify
setup:
	corepack enable
	pnpm install --no-frozen-lockfile
	cp -n .env.example .env || true
up:
	docker compose up --build
migrate:
	pnpm db:migrate
seed:
	pnpm db:seed
dev:
	pnpm dev
test:
	pnpm test
verify:
	pnpm verify
