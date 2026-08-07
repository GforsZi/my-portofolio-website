import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Use `?? ""` instead of `env("DATABASE_URL")` so `prisma generate` still
    // works before the database is configured (e.g. in CI).
    url: process.env.DATABASE_URL ?? "",
  },
});
