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

  // ---- SkillCategories (dari fallbackSkillCategories) ----
  const skillCategories = [
    { id: "skill-category-bahasa", name: "Bahasa Pemrograman" },
    { id: "skill-category-framework", name: "Framework" },
    { id: "skill-category-library", name: "Library" },
    { id: "skill-category-database", name: "Database" },
    { id: "skill-category-tools", name: "Tools" },
    { id: "skill-category-os", name: "OS" },
    { id: "skill-category-cli", name: "CLI Utility" },
  ];

  for (const category of skillCategories) {
    await prisma.skillCategories.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  // ---- Skills (dari public/img/skill/*.svg, disamakan dengan fallbackSkills) ----
  const skills = [
    // Bahasa Pemrograman
    { name: "CSS", imgUrl: "/img/skill/css.svg", categoryId: "skill-category-bahasa" },
    { name: "Go", imgUrl: "/img/skill/go.svg", categoryId: "skill-category-bahasa" },
    { name: "HTML5", imgUrl: "/img/skill/html5.svg", categoryId: "skill-category-bahasa" },
    { name: "JavaScript", imgUrl: "/img/skill/javascript.svg", categoryId: "skill-category-bahasa" },
    { name: "PHP", imgUrl: "/img/skill/php.svg", categoryId: "skill-category-bahasa" },
    { name: "Python", imgUrl: "/img/skill/python.svg", categoryId: "skill-category-bahasa" },
    { name: "TypeScript", imgUrl: "/img/skill/typescript.svg", categoryId: "skill-category-bahasa" },
    // Framework
    { name: "Express", imgUrl: "/img/skill/express.svg", categoryId: "skill-category-framework" },
    { name: "FastAPI", imgUrl: "/img/skill/fastapi.svg", categoryId: "skill-category-framework" },
    { name: "Filament", imgUrl: "/img/skill/filament.svg", categoryId: "skill-category-framework" },
    { name: "Gin", imgUrl: "/img/skill/gin.svg", categoryId: "skill-category-framework" },
    { name: "Laravel", imgUrl: "/img/skill/laravel.svg", categoryId: "skill-category-framework" },
    { name: "Livewire", imgUrl: "/img/skill/livewire.svg", categoryId: "skill-category-framework" },
    { name: "NestJS", imgUrl: "/img/skill/nestjs.svg", categoryId: "skill-category-framework" },
    { name: "Next.js", imgUrl: "/img/skill/nextdotjs.svg", categoryId: "skill-category-framework" },
    { name: "Node.js", imgUrl: "/img/skill/nodedotjs.svg", categoryId: "skill-category-framework" },
    { name: "Tailwind CSS", imgUrl: "/img/skill/tailwindcss.svg", categoryId: "skill-category-framework" },
    { name: "Vue.js", imgUrl: "/img/skill/vuedotjs.svg", categoryId: "skill-category-framework" },
    // Library
    { name: "GSAP", imgUrl: "/img/skill/gsap.svg", categoryId: "skill-category-library" },
    { name: "Prisma", imgUrl: "/img/skill/prisma.svg", categoryId: "skill-category-library" },
    { name: "React", imgUrl: "/img/skill/react.svg", categoryId: "skill-category-library" },
    { name: "shadcn/ui", imgUrl: "/img/skill/shadcnui.svg", categoryId: "skill-category-library" },
    { name: "SQLAlchemy", imgUrl: "/img/skill/sqlalchemy.svg", categoryId: "skill-category-library" },
    // Database
    { name: "Firebase", imgUrl: "/img/skill/firebase.svg", categoryId: "skill-category-database" },
    { name: "MySQL", imgUrl: "/img/skill/mysql.svg", categoryId: "skill-category-database" },
    { name: "Supabase", imgUrl: "/img/skill/supabase.svg", categoryId: "skill-category-database" },
    // Tools
    { name: "cPanel", imgUrl: "/img/skill/cpanel.svg", categoryId: "skill-category-tools" },
    { name: "Docker", imgUrl: "/img/skill/docker.svg", categoryId: "skill-category-tools" },
    { name: "GitHub", imgUrl: "/img/skill/github.svg", categoryId: "skill-category-tools" },
    { name: "opencode", imgUrl: "/img/skill/opencode.svg", categoryId: "skill-category-tools" },
    { name: "OpenRouter", imgUrl: "/img/skill/openrouter.svg", categoryId: "skill-category-tools" },
    { name: "Postman", imgUrl: "/img/skill/postman.svg", categoryId: "skill-category-tools" },
    { name: "Vercel", imgUrl: "/img/skill/vercel.svg", categoryId: "skill-category-tools" },
    { name: "Vite", imgUrl: "/img/skill/vite.svg", categoryId: "skill-category-tools" },
    // OS
    { name: "Hyprland", imgUrl: "/img/skill/hyprland.svg", categoryId: "skill-category-os" },
    { name: "Linux", imgUrl: "/img/skill/linux.svg", categoryId: "skill-category-os" },
    { name: "NixOS", imgUrl: "/img/skill/nixos.svg", categoryId: "skill-category-os" },
    // CLI Utility
    { name: "Git", imgUrl: "/img/skill/git.svg", categoryId: "skill-category-cli" },
    { name: "GNU Bash", imgUrl: "/img/skill/gnubash.svg", categoryId: "skill-category-cli" },
    { name: "Neovim", imgUrl: "/img/skill/neovim.svg", categoryId: "skill-category-cli" },
    { name: "tmux", imgUrl: "/img/skill/tmux.svg", categoryId: "skill-category-cli" },
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
        imgUrl: skill.imgUrl,
        skillCategoryId: skill.categoryId,
      },
    });
  }

  // ---- Projects + ProjectSkills (dari fallbackProjects) ----
  const projects = [
    {
      id: "project-custom-app",
      title: "Custom App",
      description: "custom-app adalah solusi enterprise siap pakai yang dibangun dengan ekosistem Laravel/Vue modern. Fondasinya modular sehingga dapat disesuaikan dengan kebutuhan bisnis — mulai dari alur kerja khusus, konfigurasi multi-tenant, hingga antarmuka administrasi — tanpa mengorbankan kemudahan perawatan.",
      thumbnail: "/img/project/custom_app.webp",
      url: "https://github.com/username/custom-app",
      githubUrl: "https://github.com/username/custom-app",
      featured: true,
      order: 0,
      skills: ["Laravel", "Vue.js", "PHP", "MySQL"],
    },
    {
      id: "project-matcha-aquatics",
      title: "Matcha Aquatics",
      description: "Matcha Aquatics adalah aplikasi e-catalog modern untuk pengalaman belanja perlengkapan akuatik yang efisien dan interaktif. Dilengkapi integrasi pembayaran Midtrans, perhitungan ongkir RajaOngkir, autentikasi Google OAuth2, serta antarmuka responsif dengan React.js, Tailwind CSS, dan shadcn/ui.",
      thumbnail: "/img/project/matcha_aquatics.webp",
      url: "https://github.com/username/matcha-aquatics",
      githubUrl: "https://github.com/username/matcha-aquatics",
      featured: false,
      order: 1,
      skills: ["React", "Tailwind CSS", "shadcn/ui"],
    },
    {
      id: "project-petra",
      title: "Petra",
      description: "Sistem manajemen perpustakaan dengan role-based access control, pengelolaan label salinan buku, kartu anggota, dan ekspor laporan seluruh data di database. Peminjaman buku dikelola otomatis dengan notifikasi pengingat pengembalian lewat integrasi Fonnte API, sehingga menghilangkan human-error dalam pencatatan buku.",
      thumbnail: "/img/project/petra.webp",
      url: "https://github.com/username/petra",
      githubUrl: "https://github.com/username/petra",
      featured: false,
      order: 2,
      skills: ["PHP", "Laravel", "MySQL"],
    },
  ];

  for (const project of projects) {
    const { id, skills: skillNames, ...data } = project;
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
      id: "experience-inovindo-digital-media",
      role: "Backend Web Developer Internship",
      company: "PT. Inovindo Digital Media",
      companyUrl: null,
      location: "Bandung",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-04-30"),
      current: false,
      description:
        "Mempercepat siklus pengembangan software hingga 35% dan meningkatkan efisiensi waktu hingga 20% dengan merancang schema database yang mendukung replikasi untuk berbagai architecture project.\nMembangun sistem backend dan page builder kustom menggunakan Laravel & Filament untuk 4 perusahaan klien berbeda, dengan architecture dashboard admin yang dapat direplikasi lintas project.\nMerancang struktur frontend agar mudah terintegrasi penuh dengan Filament builder, memastikan setiap halaman kustom tetap SEO-optimized dan responsif.",
    },
    {
      id: "experience-properti-nusa",
      role: "Full-stack Developer Freelancer",
      company: "Properti Nusa",
      companyUrl: null,
      location: "Bandung",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-02-28"),
      current: false,
      description:
        "Memimpin pengembangan platform properti secara end-to-end dari perencanaan architecture, development software menggunakan Laravel, Livewire, dan Tailwind, hingga deployment ke hosting menggunakan C-panel.\nMenyelesaikan permasalahan fragmentasi data dengan membuat platform yang menyimpan semua data yang tersebar pada satu database, serta dilengkapi keamanan modern dengan menerapkan perlindungan CSRF, enkripsi password, dan role-based access untuk membedakan hak akses admin dan pengguna.",
    },
    {
      id: "experience-smk-mahaputra",
      role: "Backend Web Developer Internship",
      company: "SMK Mahaputra",
      companyUrl: null,
      location: "Bandung",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2026-01-31"),
      current: false,
      description:
        "Memberikan solusi atas kasus banyaknya buku yang hilang, serta memperbarui sistem manajemen perpustakaan yang tradisional ke sistem manajemen digital yang dilengkapi pencatatan otomatis dan dapat diekspor ke PDF dan Excel.\nMerancang sistem manajemen perpustakaan yang mendukung fitur role-based access control, pengelolaan label salinan buku, pengelolaan kartu anggota perpustakaan, pengelolaan ekspor laporan pada seluruh data di database.\nMengimplementasikan sistem peminjaman buku yang terkelola secara otomatis dengan notifikasi pengingat tanggal pengembalian otomatis (integrasi Fonnte API), serta 100% menghilangkan human-error dalam sistem pencatatan buku.",
    },
    {
      id: "experience-matcha-aquatics",
      role: "Full-stack Developer Volunteers",
      company: "Matcha Aquatics",
      companyUrl: null,
      location: "Bandung",
      startDate: new Date("2025-10-01"),
      endDate: new Date("2025-12-31"),
      current: false,
      description:
        "Mengembangkan platform point of sale dengan kemampuan menerima multi-order serta mendukung pembayaran otomatis melalui integrasi Midtrans API, dan autentikasi via Google OAuth2 untuk kenyamanan pengguna.\nMembuat tampilan modern dan responsif menggunakan React + Shadcn, serta membuat struktur component yang terorganisir, dengan management state yang optimal, dan menggunakan TypeScript untuk type-safe agar pengelolaan data yang aman.",
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
