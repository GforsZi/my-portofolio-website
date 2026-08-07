# Portofolio — Dokumentasi Project

Website portofolio pribadi yang dibangun di atas **Next.js 16** (App Router), **React 19**, **TypeScript** (strict), **Tailwind CSS v4**, **shadcn/ui**, dan **Prisma 7** yang terhubung ke **Supabase** (PostgreSQL).

Dokumen ini menjelaskan konsep, metode, dan implementasi seluruh yang ada di project ini agar mudah dipahami dan dikembangkan.

---

## Daftar Isi

- [Konsep](#konsep)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Arsitektur & Metode](#arsitektur--metode)
- [Struktur Direktori](#struktur-direktori)
- [Setup & Instalasi](#setup--instalasi)
- [Perintah yang Tersedia](#perintah-yang-tersedia)
- [Tema Light/Dark](#tema-lightdark)
- [Panduan Pengembangan](#panduan-pengembangan)
- [Catatan Lingkungan (NixOS)](#catatan-lingkungan-nixos)

---

## Konsep

Project ini dibuat dengan beberapa prinsip utama:

1. **Komponen yang dapat dikelola dengan mudah** — setiap bagian halaman (hero, tentang, proyek, keahlian, pengalaman) adalah komponen terpisah di `components/sections/`, sehingga mudah diubah, ditambah, atau dihapus tanpa menyentuh file lain.

2. **Konten dinamis dengan fallback** — semua konten diambil melalui satu *data layer* (`lib/data.ts`). Selama database belum dikonfigurasi atau belum berisi data, halaman otomatis menampilkan konten fallback dari `content/site.ts`. Saat database sudah aktif dan terisi, halaman otomatis menampilkan data asli dari database — tanpa mengubah satu baris pun di komponen.

3. **Tema yang fleksibel** — mendukung mode terang/gelap (light/dark) dan mengikuti preferensi sistem, dengan warna `primary` hitam/putih dan `secondary` biru `#1591DC`.

4. **Siap dikembangkan (scalable)** — pola *data layer*, komponen presentasional, dan struktur folder yang jelas memudahkan penambahan fitur baru seperti halaman baru, model database baru, atau sumber data baru.

---

## Teknologi yang Digunakan

| Teknologi | Versi | Peran |
|---|---|---|
| Next.js | 16.3.0 | Framework (App Router, React Server Components) |
| React | 19.2.8 | Library UI |
| TypeScript | 5.x (strict) | Keamanan tipe |
| Tailwind CSS | v4 | Styling (tanpa file `tailwind.config`, lewat CSS) |
| shadcn/ui | v4 (preset `radix-nova`) | Komponen UI (Button, Card, Badge, dll.) |
| next-themes | 0.4.6 | Manajemen tema light/dark/system |
| Prisma | 7.9.1 | ORM & migrasi database |
| Supabase | — | Database PostgreSQL (hosted) |
| @prisma/adapter-pg + pg | 7.9.1 / 8.22.0 | Driver koneksi database (rust-free) |
| pnpm | 11.15.0 | Package manager |

---

## Arsitektur & Metode

### 1. Pola Data Layer (Kunci Utama)

Semua akses data melewati satu pintu: `lib/data.ts`. Fungsi-fungsi di sana menangkap kegagalan koneksi database dan menjatuhkannya (fallback) ke data statis.

```ts
// lib/data.ts (ringkas)
export async function getProfile() {
  try {
    const profile = await prisma.profile.findFirst();
    return profile ?? fallbackProfile;      // DB aktif tapi kosong → fallback
  } catch {
    return fallbackProfile;                  // DB belum aktif → fallback
  }
}
```

**Manfaat:**
- Halaman tidak pernah error/blank meski database belum dikonfigurasi.
- Komponen tidak peduli data datang dari mana — cukup menerima props dan merender.
- Saat database siap, cukup isi tabelnya; tidak ada perubahan kode.
- Data fallback di-`type` dengan tipe model Prisma yang di-generate (`ProfileModel`, `ProjectModel`, dll.), jadi strukturnya selalu selaras dengan schema database.

### 2. Komponen Presentasional (Server Components)

Section-section adalah **React Server Components** murni yang menerima data lewat props, bukan mengambil data sendiri. Ini membuatnya mudah diuji, di-reuse, dan dipisahkan.

Contoh alur render halaman utama (`app/page.tsx`):

```
app/page.tsx
  ├─ getProfile()      →  <Hero/>            + <About/>
  ├─ getProjects()     →  <ProjectsSection/>
  ├─ getSkills()       →  <SkillsSection/>
  ├─ getExperiences()  →  <ExperiencesSection/>
```

Halaman `/proyek` memakai ulang `ProjectGrid` yang sama — bukti bahwa komponen presentasional bisa dipakai di banyak tempat.

### 3. Database & Prisma 7

Prisma 7 memiliki perbedaan besar dari versi sebelumnya:

- **URL koneksi ada di `prisma.config.ts`**, bukan di `schema.prisma` (block `datasource` hanya berisi `provider`).
- Generator baru `prisma-client` **wajib** memiliki `output`. Di project ini hasil generate ada di `generated/prisma/`.
- `engineType = "client"` membuat client menjadi **pure TypeScript (rust-free)** — tidak butuh binary native saat runtime, hanya butuh *driver adapter* (`PrismaPg`).
- Prisma tidak lagi otomatis membaca `.env`; `prisma.config.ts` harus `import "dotenv/config"`.

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
  engineType = "client"            // rust-free
  importFileExtension = "ts"       // agar seed via tsx bisa resolve import
}

datasource db {
  provider = "postgresql"
}
```

```ts
// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",  // "" agar `prisma generate` tetap jalan tanpa .env
  },
});
```

**Model yang tersedia** (di `prisma/schema.prisma`): `Profile`, `Project`, `Skill`, `Experience`.

### 4. Koneksi Database (Singleton)

Karena Next.js bisa menjalankan banyak instans PrismaClient di mode development (hot reload), dibuat pola *singleton* menggunakan `globalThis`:

```ts
// lib/prisma.ts
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 5. Tema Light/Dark

Menggunakan `next-themes` dengan `attribute="class"` — tema ditandai lewat class `.dark` pada elemen `<html>`. Tema default mengikuti sistem (`system`), bisa diubah lewat *dropdown* di navbar (Light / Dark / System).

Warna didefinisikan sebagai CSS variable di `app/globals.css`:

```css
:root {
  --primary: oklch(0.205 0 0);      /* hitam  */
  --secondary: #1591dc;              /* biru   */
}
.dark {
  --primary: oklch(0.922 0 0);      /* putih  */
  --secondary: #1591dc;
}
```

### 6. shadcn/ui

shadcn/ui bukan *library* melainkan kode komponen yang di-copy ke `components/ui/` dan bebas diedit. Setup di project ini:

- Konfigurasi: `components.json` (preset `radix-nova`, ikon `lucide`).
- Komponen yang sudah tersedia: `button`, `card`, `input`, `label`, `textarea`, `badge`, `separator`, `avatar`, `dropdown-menu`.
- Komponen baru bisa ditambah dengan: `pnpm dlx shadcn@latest add <nama-komponen>`.

---

## Struktur Direktori

```
.
├── app/
│   ├── layout.tsx            # Root layout: ThemeProvider, Navbar, Footer, font
│   ├── page.tsx              # Halaman utama (komposisi section)
│   ├── proyek/
│   │   └── page.tsx          # Halaman daftar proyek + filter tag
│   └── globals.css           # Tailwind v4 + token tema
├── components/
│   ├── layouts/
│   │   ├── navbar.tsx        # Sticky header + navigasi + theme toggle
│   │   ├── footer.tsx        # Footer dengan social links
│   │   └── theme-toggle.tsx  # Dropdown Light/Dark/System
│   ├── sections/             # Komponen section (presentasional)
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── projects-section.tsx
│   │   ├── project-grid.tsx
│   │   ├── project-card.tsx
│   │   ├── skills-section.tsx
│   │   └── experiences-section.tsx
│   ├── ui/                   # Komponen shadcn (boleh diedit)
│   └── theme-provider.tsx    # Wrapper next-themes
├── content/
│   └── site.ts               # siteConfig + data fallback
├── lib/
│   ├── prisma.ts             # Singleton PrismaClient + adapter
│   ├── data.ts               # Data layer (sumber utama konten)
│   └── utils.ts              # cn() helper (dari shadcn)
├── prisma/
│   ├── schema.prisma         # Model database
│   └── seed.ts               # Data contoh untuk seeding
├── generated/prisma/         # Hasil generate client (gitignored)
├── prisma.config.ts          # Konfigurasi CLI Prisma (URL, migrasi, seed)
└── .env / .env.example       # Konfigurasi environment
```

---

## Setup & Instalasi

### 1. Persyaratan

- Node.js 20.19+ / 22.12+ / 24+
- pnpm 11.x
- Akun Supabase (untuk database)

### 2. Instalasi dependency

```bash
pnpm install
```

### 3. Konfigurasi environment

```bash
cp .env.example .env
```

Isi `DATABASE_URL` di `.env` dengan connection string dari **Supabase Dashboard → Project Settings → Database → Connection string**:

```
DATABASE_URL="postgresql://postgres.<project-ref>:<db-password>@aws-0-<region>.pooler.supabase.com:5432/postgres"
```

> Gunakan port `5432` (session pooler) untuk umum; port `6543` (transaction pooler) jika butuh lebih banyak koneksi.

### 4. Generate client & sinkronkan schema

```bash
pnpm db:generate   # generate Prisma Client ke generated/prisma/
pnpm db:push       # sinkronkan schema ke Supabase
pnpm db:seed       # isi data contoh (opsional)
```

### 5. Jalankan

```bash
pnpm dev   # http://localhost:3000
```

---

## Perintah yang Tersedia

| Perintah | Fungsi |
|---|---|
| `pnpm dev` | Menjalankan dev server |
| `pnpm build` | Build produksi (termasuk typecheck) |
| `pnpm start` | Menjalankan hasil build |
| `pnpm lint` | ESLint (flat config) |
| `pnpm exec tsc --noEmit` | Typecheck saja (tanpa build) |
| `pnpm db:generate` | Generate Prisma Client (wajib setelah ubah schema) |
| `pnpm db:push` | Sinkron schema ke database (tanpa riwayat migrasi) |
| `pnpm db:migrate` | Buat & terapkan migrasi (development) |
| `pnpm db:deploy` | Terapkan migrasi (production) |
| `pnpm db:studio` | Buka Prisma Studio |
| `pnpm db:seed` | Menjalankan `prisma/seed.ts` |
| `pnpm dlx shadcn@latest add <nama>` | Tambah komponen shadcn |

---

## Tema Light/Dark

- Toggle ada di navbar (kanan atas), pilihan: **Light**, **Dark**, **System**.
- Default `system` — mengikuti pengaturan OS.
- Perubahan tema disimpan oleh `next-themes` dan diterapkan sebagai class `.dark` pada `<html>`.
- Token warna di `app/globals.css`:
  - `--primary`: hitam (light) / putih (dark)
  - `--secondary`: `#1591DC` (keduanya)
- Karena tema memakai class, komponen dapat memakai util `dark:` biasa, misal `dark:bg-zinc-900`.

---

## Panduan Pengembangan

### Menambah proyek di database

Isi tabel `Project` (lewat Prisma Studio, seed, atau query) dengan field:
`title`, `description`, `tags`, `url`, `githubUrl`, `featured`, `order`, dst.

Saat database kosong, proyek yang tampil adalah `fallbackProjects` di `content/site.ts`.

### Menambah section baru

1. Buat komponen di `components/sections/`, contoh `contact-section.tsx`.
2. Jika butuh data, tambahkan fungsi getter di `lib/data.ts` (atau pakai yang ada).
3. Panggil komponen tersebut di `app/page.tsx`.

### Mengubah teks navigasi / judul

Semua teks "chrome" situs (nama situs, link navbar, judul section, sosial media) ada di `content/site.ts` → `siteConfig`. Ubah di satu tempat.

### Menambah model database baru

1. Tambahkan `model` di `prisma/schema.prisma`.
2. `pnpm db:generate` lalu `pnpm db:push`.
3. Tambahkan getter di `lib/data.ts` + fallback di `content/site.ts`.
4. (Opsional) tambahkan komponen section-nya.

### Menambah halaman baru

Buat folder di `app/`, misal `app/artikel/page.tsx`. Halaman akan otomatis terhubung ke Navbar/Footer (root layout) dan metadata menempel pola `%s · Portofolio`.

---

## Catatan Lingkungan (NixOS)

Mesin pengembangan ini berbasis **NixOS**, yang membuat Prisma CLI **tidak bisa** mengunduh engine native-nya (`linux-nixos` → 404 di CDN Prisma). Solusi yang dipakai:

```bash
nix profile install nixpkgs#prisma-engines
export PRISMA_SCHEMA_ENGINE_BINARY="$HOME/.nix-profile/bin/schema-engine"
```

Tambahkan `export` tersebut ke `~/.zshrc` agar permanen. Prisma 7 hanya butuh env var ini (tidak ada query/migration engine terpisah).

> Client Prisma di project ini **tidak** butuh binary native (rust-free, `engineType = "client"`). Yang butuh `schema-engine` hanyalah CLI Prisma (`generate`, `migrate`, `db push`, `studio`).

---

## Penutup

Project ini dirancang sebagai **boilerplate yang siap dikembangkan**:

- **Konten dinamis** tanpa bergantung database dulu (data layer + fallback).
- **Komponen modular** yang mudah dikelola per-section.
- **Tema** lengkap light/dark dengan warna sesuai identitas (`#1591DC`).
- **Database siap pakai** dengan Prisma 7 + Supabase dan pola yang mengikuti best practice Prisma 7.
