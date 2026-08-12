import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

function slugify(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}

async function main() {
  // ---- AppSettings (disamakan dengan content/site.ts) ----
  const settings = [
    { type: "site", key: "name", title: "Nama Situs", value: "Portofolio (eary access)" },
    {
      type: "site",
      key: "description",
      title: "Deskripsi Situs",
      value: "Personal portfolio built with Next.js, Tailwind CSS, shadcn/ui, and Prisma.",
    },
    { type: "social", key: "github", title: "GitHub", value: "https://github.com/username" },
    { type: "social", key: "linkedin", title: "LinkedIn", value: "https://www.linkedin.com/in/username" },
    { type: "social", key: "twitter", title: "Twitter", value: "https://x.com/username" },
    { type: "social", key: "email", title: "Email", value: "mailto:hello@example.com" },
    { type: "profile", key: "name", title: "Nama", value: "Nama Anda" },
    { type: "profile", key: "headline", title: "Headline", value: "Software Engineer" },
    {
      type: "profile",
      key: "bio",
      title: "Bio",
      value:
        "Saya adalah software engineer yang fokus membangun aplikasi web modern menggunakan Next.js, React, dan TypeScript. Saya suka merancang produk yang cepat, aksesibel, dan mudah dirawat.",
    },
    { type: "profile", key: "location", title: "Lokasi", value: "Jakarta, Indonesia" },
  ];

  for (const setting of settings) {
    await prisma.appSettings.upsert({
      where: { type_key: { type: setting.type, key: setting.key } },
      update: {},
      create: setting,
    });
  }

  // ---- PageNavigations (dari siteConfig.navLinks) ----
  const navigations = [
    { label: "Proyek", position: 0, type: "link" as const, data: { url: "/proyek" } },
    { label: "Tentang", position: 1, type: "link" as const, data: { url: "/#tentang" } },
    { label: "Pengalaman", position: 2, type: "link" as const, data: { url: "/#pengalaman" } },
    { label: "Keahlian", position: 3, type: "link" as const, data: { url: "/#keahlian" } },
  ];

  for (const nav of navigations) {
    await prisma.pageNavigations.upsert({
      where: { id: `page-nav-${slugify(nav.label)}` },
      update: {},
      create: { id: `page-nav-${slugify(nav.label)}`, ...nav },
    });
  }

  // ---- ArticleCategories ----
  const articleCategories = [
    { id: "article-category-web", slug: "web", name: "Web" },
    { id: "article-category-tutorial", slug: "tutorial", name: "Tutorial" },
  ];

  for (const category of articleCategories) {
    await prisma.articleCategories.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  // ---- Articles + CategoriesArticles ----
  const articles = [
    {
      id: "article-hello-world",
      slug: "hello-world",
      title: "Hello World",
      content: "Ini adalah artikel pertama saya.",
      status: "publikasi" as const,
      categorySlug: "web",
    },
    {
      id: "article-belajar-nextjs",
      slug: "belajar-nextjs",
      title: "Belajar Next.js",
      content: "Panduan singkat memulai Next.js.",
      status: "draf" as const,
      categorySlug: "tutorial",
    },
  ];

  for (const article of articles) {
    const { categorySlug, ...data } = article;
    await prisma.articles.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });

    const category = await prisma.articleCategories.findUniqueOrThrow({
      where: { slug: categorySlug },
    });

    await prisma.categoriesArticles.upsert({
      where: { id: `categories-articles-${article.id}-${category.id}` },
      update: {},
      create: {
        id: `categories-articles-${article.id}-${category.id}`,
        articleId: article.id,
        articleCategoryId: category.id,
      },
    });
  }

  // ---- SkillCategories (dari fallbackSkills.category) ----
  const skillCategories = [
    { id: "skill-category-bahasa", name: "Bahasa" },
    { id: "skill-category-framework", name: "Framework" },
    { id: "skill-category-styling", name: "Styling" },
    { id: "skill-category-database", name: "Database" },
    { id: "skill-category-platform", name: "Platform" },
  ];

  for (const category of skillCategories) {
    await prisma.skillCategories.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  // ---- Skills (dari fallbackSkills) ----
  const skills = [
    { name: "TypeScript", categoryId: "skill-category-bahasa" },
    { name: "Next.js", categoryId: "skill-category-framework" },
    { name: "React", categoryId: "skill-category-framework" },
    { name: "Tailwind CSS", categoryId: "skill-category-styling" },
    { name: "Prisma", categoryId: "skill-category-database" },
    { name: "PostgreSQL", categoryId: "skill-category-database" },
    { name: "Supabase", categoryId: "skill-category-platform" },
  ];

  for (const [index, skill] of skills.entries()) {
    await prisma.skills.upsert({
      where: { slug: slugify(skill.name) },
      update: {},
      create: {
        id: `skill-${slugify(skill.name)}`,
        name: skill.name,
        slug: slugify(skill.name),
        order: index,
        skillCategoryId: skill.categoryId,
      },
    });
  }

  // ---- Projects + ProjectSkills (dari fallbackProjects) ----
  const projects = [
    {
      title: "Dashboard Analitik",
      description: "Dashboard analitik real-time untuk memantau metrik produk dengan visualisasi data interaktif.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      url: "https://example.com/dashboard",
      githubUrl: "https://github.com/username/dashboard-analitik",
      featured: true,
      order: 0,
      skills: ["Next.js", "Prisma", "Supabase", "Recharts"],
    },
    {
      title: "Platform Belajar Online",
      description: "Platform kursus online dengan sistem manajemen materi, kuis, dan sertifikat.",
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80",
      url: "https://example.com/belajar",
      githubUrl: "https://github.com/username/platform-belajar",
      featured: false,
      order: 1,
      skills: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    },
    {
      title: "Aplikasi Catatan",
      description: "Aplikasi catatan berbasis keyboard dengan sinkronisasi lintas perangkat.",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
      url: null,
      githubUrl: "https://github.com/username/aplikasi-catatan",
      featured: false,
      order: 2,
      skills: ["React", "TypeScript", "IndexedDB"],
    },
  ];

  for (const project of projects) {
    const { skills: skillNames, ...data } = project;
    const id = `project-${slugify(project.title)}`;
    await prisma.projects.upsert({
      where: { id },
      update: {},
      create: { id, ...data },
    });

    const skillRecords = await prisma.skills.findMany({
      where: { name: { in: skillNames } },
    });

    for (const skill of skillRecords) {
      await prisma.projectSkills.upsert({
        where: { id: `project-skill-${id}-${skill.id}` },
        update: {},
        create: {
          id: `project-skill-${id}-${skill.id}`,
          projectId: id,
          skillId: skill.id,
        },
      });
    }
  }

  // ---- Experiences (dari fallbackExperiences) ----
  const experiences = [
    {
      id: "experience-frontend-engineer",
      role: "Frontend Engineer",
      company: "PT Teknologi Maju",
      companyUrl: "https://example.com",
      location: "Jakarta, Indonesia",
      startDate: new Date("2024-01-01"),
      endDate: null,
      current: true,
      description:
        "Mengembangkan fitur-fitur frontend untuk produk SaaS, meningkatkan performa halaman hingga 40%, dan membimbing developer junior.",
    },
    {
      id: "experience-web-developer",
      role: "Web Developer",
      company: "Startup Digital",
      companyUrl: null,
      location: "Bandung, Indonesia",
      startDate: new Date("2022-06-01"),
      endDate: new Date("2023-12-31"),
      current: false,
      description: "Membangun website dan aplikasi internal untuk klien, dari perancangan hingga deployment.",
    },
  ];

  for (const experience of experiences) {
    const { id, ...data } = experience;
    await prisma.experiences.upsert({
      where: { id },
      update: {},
      create: { id, ...data },
    });
  }

  // ---- Certifications (disamakan dengan fallbackCertifications) ----
  const certifications = [
    {
      id: "certification-penghargaan-jr-web-dev",
      title: "Penghargaan Junior Web Developer",
      description:
        "Penghargaan atas pencapaian sebagai junior web developer dalam program pelatihan pengembangan web.",
      thumbnail: "/img/certification/penghargaan_jr_web_dev.webp",
      url: null,
      releaseYear: 2025,
      order: 0,
    },
    {
      id: "certification-penghargaan-porto",
      title: "Penghargaan Portofolio",
      description:
        "Penghargaan untuk portofolio terbaik yang menampilkan karya pengembangan aplikasi web.",
      thumbnail: "/img/certification/penghargaan_porto.webp",
      url: null,
      releaseYear: 2025,
      order: 1,
    },
    {
      id: "certification-ukk",
      title: "Sertifikat Uji Kompetensi Keahlian (UKK)",
      description:
        "Sertifikat kelulusan uji kompetensi keahlian bidang pengembangan perangkat lunak.",
      thumbnail: "/img/certification/sertifikat_ukk-1.webp",
      url: null,
      releaseYear: 2025,
      order: 2,
    },
    {
      id: "certification-pkl",
      title: "Sertifikat Praktik Kerja Lapangan (PKL)",
      description:
        "Sertifikat penyelesaian praktik kerja lapangan di industri selama masa pendidikan.",
      thumbnail: "/img/certification/serti_mp_pkl-1.webp",
      url: null,
      releaseYear: 2025,
      order: 3,
    },
    {
      id: "certification-kunjungan-industri",
      title: "Sertifikat Kunjungan Industri",
      description:
        "Sertifikat partisipasi dalam kegiatan kunjungan industri untuk mengenal dunia kerja.",
      thumbnail: "/img/certification/serti_kunjin.webp",
      url: null,
      releaseYear: 2025,
      order: 4,
    },
  ];

  for (const certification of certifications) {
    await prisma.certifications.upsert({
      where: { id: certification.id },
      update: {},
      create: certification,
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
