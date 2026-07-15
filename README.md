# crud-test-app

Monorepo simples de CRUD (Tasks) pra testar o view-db: import de schema Prisma via GitHub e scan de endpoints (backend NestJS + chamadas do frontend).

- `apps/api` — NestJS + Prisma, CRUD de `Task` (`GET/POST/PATCH/DELETE /tasks`)
- `apps/web` — Vite + React, lista/cria/marca/exclui tasks chamando a API

## Banco de dados

Postgres gratuito criado no Supabase (org `Erp_cutter`, projeto `crud-test-app`, host `db.yldtzgupacoyddrtiwwn.supabase.co`). A tabela `Task` já foi criada.

1. Copie `apps/api/.env.example` para `apps/api/.env`
2. Pegue a senha do banco no dashboard do Supabase (Project Settings > Database) e preencha `DATABASE_URL`

## Rodando

```bash
npm install
npm run prisma:generate --workspace apps/api

npm run dev:api   # http://localhost:4001
npm run dev:web   # http://localhost:5173
```
