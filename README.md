# Portofolio

Website portofolio pribadi (Givaldi Gumelar Setiawan) — dibangun dengan Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, dan Prisma 7 + Supabase (PostgreSQL).

## Quick Start

```bash
pnpm install
cp .env.example .env   # isi DATABASE_URL & DIRECT_URL dari Supabase
pnpm db:generate       # generate Prisma Client ke generated/prisma/
pnpm db:push           # sinkronkan schema ke Supabase
pnpm db:seed           # isi data contoh (opsional)
pnpm dev               # http://localhost:3000
```

`DATABASE_URL` dipakai aplikasi saat runtime (transaction pooler), `DIRECT_URL` dipakai Prisma CLI (session pooler). Detail di `.env.example`.

## Perintah

| Perintah | Fungsi |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Build produksi (termasuk typecheck) |
| `pnpm lint` | ESLint |
| `pnpm exec tsc --noEmit` | Typecheck saja |
| `pnpm db:generate` | Generate Prisma Client (wajib setelah ubah schema) |
| `pnpm db:push` | Sinkron schema ke database |
| `pnpm db:migrate` / `db:deploy` | Migrasi dev / production |
| `pnpm db:seed` | Isi data contoh |
| `pnpm db:studio` | Buka Prisma Studio |
| `pnpm dlx shadcn@latest add <nama>` | Tambah komponen shadcn/ui |

## Mengedit Konten

Konten diambil lewat data layer `lib/data.ts`. Jika database kosong atau belum dikonfigurasi, halaman otomatis memakai data fallback di `content/site.ts` — jadi tanpa database pun situs tetap berjalan dan terlihat lengkap.

- **Fallback data & teks situs** (nama, navbar, sosial media, proyek, skill, pengalaman, sertifikat): `content/site.ts`
- **Getter data**: `lib/data.ts`
- **Schema database**: `prisma/schema.prisma`
- **Komponen section**: `components/sections/`

## Struktur

```
app/                    # Halaman & layout (App Router)
components/sections/    # Komponen section (hero, projects, skills, ...)
components/ui/          # Komponen shadcn/ui (bisa diedit)
content/site.ts         # Data fallback + siteConfig
lib/data.ts             # Data layer (fallback DB → static)
lib/prisma.ts           # PrismaClient singleton
prisma/schema.prisma    # Model database
generated/prisma/       # Hasil generate client (gitignored)
```

## Catatan NixOS

Mesin pengembangan ini NixOS. Prisma CLI butuh `prisma-engines` (`nix profile install nixpkgs#prisma-engines`) dan env `PRISMA_SCHEMA_ENGINE_BINARY`. Perintah yang menghubungi database juga butuh `LD_LIBRARY_PATH` ke lib OpenSSL. Detail lengkap ada di `AGENTS.md`.
