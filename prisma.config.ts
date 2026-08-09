import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Prisma 7 removed `directUrl`. The CLI (migrate / db push / studio) always
    // uses this `url`, so point it at the session pooler / direct connection
    // (DIRECT_URL) instead of the transaction pooler (DATABASE_URL).
    // Use `?? ""` instead of `env("...")` so `prisma generate` still works
    // before the database is configured (e.g. in CI).
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
