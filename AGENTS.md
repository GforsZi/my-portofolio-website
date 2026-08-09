<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

Personal portfolio site. Next.js 16.3.0 + React 19, Tailwind CSS v4, TypeScript strict, App Router. Styled with shadcn/ui (v4, preset `radix-nova`), data layer is Prisma 7 against Supabase Postgres.

## Commands

- Package manager is **pnpm** (11.15.0). Do not use npm/yarn — the lockfile is `pnpm-lock.yaml`.
- `pnpm dev` — dev server
- `pnpm lint` — ESLint (flat config `eslint.config.mjs`)
- `pnpm build` — production build (runs typecheck; there is no separate `typecheck` script; use `pnpm exec tsc --noEmit` for a typecheck-only pass)
- No test framework is set up.

### Prisma / DB

- `pnpm db:generate` — generate client into `generated/prisma/` (must re-run after any schema change)
- `pnpm db:push` — sync schema to Supabase (no migration history)
- `pnpm db:migrate` / `pnpm db:deploy` — dev / prod migrations
- `pnpm db:seed` — runs `prisma/seed.ts` via `tsx`
- `pnpm db:studio` — Prisma Studio

## Structure & conventions

- Source lives in `app/` (App Router). Path alias `@/*` maps to the repo **root**, not `src/`.
- Tailwind v4: there is **no `tailwind.config.*`**. Theme tokens are defined via `@theme inline` in `app/globals.css`; edit those CSS variables, not a config file.
- `CLAUDE.md` just references this file, so `AGENTS.md` is the single instruction source.

## shadcn/ui

- Config lives in `components.json` (aliases: `@/components`, `@/components/ui`, `@/lib/utils`, `@/hooks`).
- Components are source-controlled in `components/ui/` and may be edited freely. Add new ones with `pnpm dlx shadcn@latest add <name>`.
- The v4 CLI uses presets — `-b` now selects the component library base (`radix`/`base`/`aria`), **not** the color. Radix components import from the unified `radix-ui` package (e.g. `import { Slot } from "radix-ui"`), not `@radix-ui/react-*`.
- Newest components are `data-slot`/CSS-variable driven (e.g. `px-(--card-spacing)`); don't restyle them with fixed values from older shadcn versions.

## Prisma 7 (this is NOT Prisma 6)

- Connection URL lives in **`prisma.config.ts`** (`datasource.url`), **not** in `schema.prisma`. The `datasource` block only declares `provider = "postgresql"`.
- The `prisma.config.ts` must `import "dotenv/config"` — Prisma 7 no longer auto-loads `.env`. It uses `process.env.DATABASE_URL ?? ""` (not `env()`) so `db:generate` works before the DB is configured.
- Generator is `provider = "prisma-client"` with a **required** `output = "../generated/prisma"` (relative to `prisma/schema.prisma`, i.e. `./generated/prisma`). Import from `@/generated/prisma/client`, never from `@prisma/client`.
- `engineType = "client"` is set: the client is pure TS (rust-free) and **requires a driver adapter** — see `lib/prisma.ts` (`PrismaPg` from `@prisma/adapter-pg`). Runtime apps need the `DATABASE_URL` env var; there is no native query engine.
- `generated/prisma/` is gitignored; `app/page.tsx` and `prisma/seed.ts` won't typecheck until `pnpm db:generate` has run.
- `.env.example` is the committed template; `.env` is gitignored.

## Gotchas

- This dev machine is **NixOS**: Prisma CLI cannot fetch its native `schema-engine` for `linux-nixos` (404 on the Prisma CDN). Every `prisma` command fails until `prisma-engines` is installed (`nix profile install nixpkgs#prisma-engines`) and `PRISMA_SCHEMA_ENGINE_BINARY` points at `~/.nix-profile/bin/schema-engine`. Prisma 7 needs only that one env var — there is no separate query/migration engine.
- On NixOS the schema-engine also fails to detect OpenSSL ("Defaulting to openssl-1.1.x") and any **command that connects to the DB** (`db push`, `migrate`, `studio`, `db seed`) then dies with `P1001: Can't reach database server`. Fix: run them with `LD_LIBRARY_PATH` set to the openssl lib dir of the engine binary. Current value: `LD_LIBRARY_PATH=/nix/store/604a9ayx3kdxqlx72f5wb39gn401y38v-openssl-3.6.3/lib`. Re-derive after a rebuild with: `ldd "$PRISMA_SCHEMA_ENGINE_BINARY" | grep -o '/nix/store/[^ ]*openssl[^ ]*/lib' | head -1`. Note `db:generate` does NOT need this (no DB connection) — `prisma validate` works too, but only reports the warning.
- `pnpm-workspace.yaml` uses `allowBuilds` (pnpm 11): only listed packages may run postinstall scripts. `sharp` and `unrs-resolver` stay `false`; `@prisma/engines`, `prisma`, and `esbuild` are allowed. If pnpm installs a package with a blocked build script, add it to `allowBuilds: true` (or `pnpm approve-builds`) instead of bypassing.
