import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.profile.upsert({
    where: { id: "profile-main" },
    update: {},
    create: {
      id: "profile-main",
      name: "Nama Anda",
      headline: "Software Engineer",
      bio: "Tulis bio singkat di sini.",
      github: "https://github.com/username",
      linkedin: "https://www.linkedin.com/in/username",
    },
  });

  const projects = [
    {
      title: "Project Satu",
      description: "Deskripsi singkat project pertama.",
      tags: ["Next.js", "Tailwind"],
      featured: true,
    },
    {
      title: "Project Dua",
      description: "Deskripsi singkat project kedua.",
      tags: ["Prisma", "Supabase"],
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: `project-${project.title.toLowerCase().replace(/\s+/g, "-")}` },
      update: {},
      create: { id: `project-${project.title.toLowerCase().replace(/\s+/g, "-")}`, ...project },
    });
  }

  const skills = ["TypeScript", "Next.js", "React", "Tailwind CSS", "Prisma", "PostgreSQL"];

  for (const [index, name] of skills.entries()) {
    await prisma.skill.upsert({
      where: { id: `skill-${name.toLowerCase().replace(/\s+/g, "-")}` },
      update: {},
      create: {
        id: `skill-${name.toLowerCase().replace(/\s+/g, "-")}`,
        name,
        category: "frontend",
        order: index,
      },
    });
  }

  console.log("Seed selesai.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
