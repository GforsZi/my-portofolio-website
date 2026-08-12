import type {
  AppSettingsModel,
  CertificationsModel,
  ExperiencesModel,
  PageNavigationsModel,
  ProjectSkillsModel,
  ProjectsModel,
  SkillCategoriesModel,
  SkillsModel,
} from "@/generated/prisma/models";

export const siteConfig = {
  name: "Portofolio",
  description: "Personal portfolio built with Next.js, Tailwind CSS, shadcn/ui, and Prisma.",
  navLinks: [
    { href: "/proyek", label: "Proyek" },
    { href: "/#tentang", label: "Tentang" },
    { href: "/#pengalaman", label: "Pengalaman" },
    { href: "/#keahlian", label: "Keahlian" },
  ],
  socials: {
    github: "https://github.com/username",
    linkedin: "https://www.linkedin.com/in/username",
    twitter: "https://x.com/username",
    email: "mailto:hello@example.com",
  },
  sections: {
    about: "Tentang",
    projects: "Proyek",
    skills: "Keahlian",
    experiences: "Pengalaman",
    projectsPageTitle: "Proyek",
    projectsPageDescription: "Kumpulan proyek yang pernah saya kerjakan.",
  },
} as const;

// Fallback content, dipakai otomatis oleh lib/data.ts selama database belum
// dikonfigurasi / belum berisi data. Struktur mengikuti model Prisma sehingga
// tinggal diganti sumber datanya ketika database sudah aktif.

const ts = (value: string) => new Date(value);

// Helper untuk membaca satu pengaturan dari AppSettings (type/key).
export function getSetting(
  settings: AppSettingsModel[],
  type: string,
  key: string,
): string | null {
  return settings.find((row) => row.type === type && row.key === key)?.value ?? null;
}

export const fallbackSettings: AppSettingsModel[] = [
  { id: "app-setting-site-name", type: "site", key: "name", title: "Nama Situs", value: "Portofolio (eary access)", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-site-description", type: "site", key: "description", title: "Deskripsi Situs", value: "Personal portfolio built with Next.js, Tailwind CSS, shadcn/ui, and Prisma.", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-social-github", type: "social", key: "github", title: "GitHub", value: "https://github.com/username", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-social-linkedin", type: "social", key: "linkedin", title: "LinkedIn", value: "https://www.linkedin.com/in/username", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-social-twitter", type: "social", key: "twitter", title: "Twitter", value: "https://x.com/username", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-social-email", type: "social", key: "email", title: "Email", value: "mailto:hello@example.com", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-profile-name", type: "profile", key: "name", title: "Nama", value: "Nama Anda", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-profile-headline", type: "profile", key: "headline", title: "Headline", value: "Software Engineer", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-profile-bio", type: "profile", key: "bio", title: "Bio", value: "Saya adalah software engineer yang fokus membangun aplikasi web modern menggunakan Next.js, React, dan TypeScript. Saya suka merancang produk yang cepat, aksesibel, dan mudah dirawat.", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-profile-location", type: "profile", key: "location", title: "Lokasi", value: "Jakarta, Indonesia", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
];

export const fallbackNavigations: PageNavigationsModel[] = [
  { id: "page-nav-proyek", label: "Proyek", position: 0, type: "link", data: { url: "/proyek" }, createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "page-nav-tentang", label: "Tentang", position: 1, type: "link", data: { url: "/#tentang" }, createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "page-nav-pengalaman", label: "Pengalaman", position: 2, type: "link", data: { url: "/#pengalaman" }, createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "page-nav-keahlian", label: "Keahlian", position: 3, type: "link", data: { url: "/#keahlian" }, createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
];

export const fallbackSkillCategories: SkillCategoriesModel[] = [
  { id: "skill-category-bahasa", name: "Bahasa", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-framework", name: "Framework", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-styling", name: "Styling", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-database", name: "Database", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-platform", name: "Platform", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
];

export type SkillWithCategory = SkillsModel & { category: SkillCategoriesModel };

export const fallbackSkills: SkillWithCategory[] = [
  { id: "skill-typescript", name: "TypeScript", slug: "typescript", order: 0, skillCategoryId: "skill-category-bahasa", category: fallbackSkillCategories[0], createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-next-js", name: "Next.js", slug: "next.js", order: 1, skillCategoryId: "skill-category-framework", category: fallbackSkillCategories[1], createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-react", name: "React", slug: "react", order: 2, skillCategoryId: "skill-category-framework", category: fallbackSkillCategories[1], createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-tailwind-css", name: "Tailwind CSS", slug: "tailwind-css", order: 3, skillCategoryId: "skill-category-styling", category: fallbackSkillCategories[2], createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-prisma", name: "Prisma", slug: "prisma", order: 4, skillCategoryId: "skill-category-database", category: fallbackSkillCategories[3], createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-postgresql", name: "PostgreSQL", slug: "postgresql", order: 5, skillCategoryId: "skill-category-database", category: fallbackSkillCategories[3], createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-supabase", name: "Supabase", slug: "supabase", order: 6, skillCategoryId: "skill-category-platform", category: fallbackSkillCategories[4], createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
];

export type ProjectWithSkills = ProjectsModel & {
  skills: (ProjectSkillsModel & { skill: SkillsModel })[];
};

const skillBySlug = new Map(fallbackSkills.map((skill) => [skill.slug, skill]));

function projectSkill(projectId: string, skill: SkillsModel): ProjectSkillsModel & { skill: SkillsModel } {
  return {
    id: `${projectId}-${skill.id}`,
    projectId,
    skillId: skill.id,
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
    skill,
  };
}

export const fallbackProjects: ProjectWithSkills[] = [
  {
    id: "project-dashboard-analitik",
    title: "Dashboard Analitik",
    description: "Dashboard analitik real-time untuk memantau metrik produk dengan visualisasi data interaktif.",
    thumbnail: "/img/certification/serti_mp_pkl-1.webp",
    url: "https://example.com/dashboard",
    githubUrl: "https://github.com/username/dashboard-analitik",
    featured: true,
    order: 0,
    createdAt: ts("2025-02-01"),
    updatedAt: ts("2025-02-01"),
    skills: [
      projectSkill("project-dashboard-analitik", skillBySlug.get("next.js")!),
      projectSkill("project-dashboard-analitik", skillBySlug.get("prisma")!),
      projectSkill("project-dashboard-analitik", skillBySlug.get("supabase")!),
    ],
  },
  {
    id: "project-platform-belajar-online",
    title: "Platform Belajar Online",
    description: "Platform kursus online dengan sistem manajemen materi, kuis, dan sertifikat.",
    thumbnail: "/img/certification/penghargaan_porto.webp",
    url: "https://example.com/belajar",
    githubUrl: "https://github.com/username/platform-belajar",
    featured: false,
    order: 1,
    createdAt: ts("2025-03-15"),
    updatedAt: ts("2025-03-15"),
    skills: [
      projectSkill("project-platform-belajar-online", skillBySlug.get("next.js")!),
      projectSkill("project-platform-belajar-online", skillBySlug.get("tailwind-css")!),
      projectSkill("project-platform-belajar-online", skillBySlug.get("postgresql")!),
    ],
  },
  {
    id: "project-aplikasi-catatan",
    title: "Aplikasi Catatan",
    description: "Aplikasi catatan berbasis keyboard dengan sinkronisasi lintas perangkat.",
    thumbnail: "/img/certification/penghargaan_jr_web_dev.webp",
    url: null,
    githubUrl: "https://github.com/username/aplikasi-catatan",
    featured: false,
    order: 2,
    createdAt: ts("2025-04-10"),
    updatedAt: ts("2025-04-10"),
    skills: [
      projectSkill("project-aplikasi-catatan", skillBySlug.get("react")!),
      projectSkill("project-aplikasi-catatan", skillBySlug.get("typescript")!),
    ],
  },
];

export const fallbackExperiences: ExperiencesModel[] = [
  {
    id: "experience-frontend-engineer",
    role: "Frontend Engineer",
    company: "PT Teknologi Maju",
    companyUrl: "https://example.com",
    location: "Jakarta, Indonesia",
    startDate: new Date("2024-01-01"),
    endDate: null,
    current: true,
    description: "Mengembangkan fitur-fitur frontend untuk produk SaaS, meningkatkan performa halaman hingga 40%, dan membimbing developer junior.",
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
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
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
  },
];

// Sertifikasi disimpan di tabel Certifications; ini fallback-nya ketika
// database belum dikonfigurasi / belum berisi data. Gambar dari public/img/certification/.
export const fallbackCertifications: CertificationsModel[] = [
  {
    id: "certification-penghargaan-jr-web-dev",
    title: "Penghargaan Junior Web Developer",
    description: "Penghargaan atas pencapaian sebagai junior web developer dalam program pelatihan pengembangan web.",
    thumbnail: "/img/certification/penghargaan_jr_web_dev.webp",
    url: null,
    releaseYear: 2025,
    order: 0,
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
  },
  {
    id: "certification-penghargaan-porto",
    title: "Penghargaan Portofolio",
    description: "Penghargaan untuk portofolio terbaik yang menampilkan karya pengembangan aplikasi web.",
    thumbnail: "/img/certification/penghargaan_porto.webp",
    url: null,
    releaseYear: 2025,
    order: 1,
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
  },
  {
    id: "certification-ukk",
    title: "Sertifikat Uji Kompetensi Keahlian (UKK)",
    description: "Sertifikat kelulusan uji kompetensi keahlian bidang pengembangan perangkat lunak.",
    thumbnail: "/img/certification/sertifikat_ukk-1.webp",
    url: null,
    releaseYear: 2025,
    order: 2,
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
  },
  {
    id: "certification-pkl",
    title: "Sertifikat Praktik Kerja Lapangan (PKL)",
    description: "Sertifikat penyelesaian praktik kerja lapangan di industri selama masa pendidikan.",
    thumbnail: "/img/certification/serti_mp_pkl-1.webp",
    url: null,
    releaseYear: 2025,
    order: 3,
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
  },
  {
    id: "certification-kunjungan-industri",
    title: "Sertifikat Kunjungan Industri",
    description: "Sertifikat partisipasi dalam kegiatan kunjungan industri untuk mengenal dunia kerja.",
    thumbnail: "/img/certification/serti_kunjin.webp",
    url: null,
    releaseYear: 2025,
    order: 4,
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
  },
];
