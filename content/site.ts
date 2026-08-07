import type {
  ExperienceModel,
  ProfileModel,
  ProjectModel,
  SkillModel,
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
export const fallbackProfile: ProfileModel = {
  id: "profile-fallback",
  name: "Nama Anda",
  headline: "Software Engineer",
  bio: "Saya adalah software engineer yang fokus membangun aplikasi web modern menggunakan Next.js, React, dan TypeScript. Saya suka merancang produk yang cepat, aksesibel, dan mudah dirawat.",
  avatarUrl: null,
  email: "hello@example.com",
  github: "https://github.com/username",
  linkedin: "https://www.linkedin.com/in/username",
  twitter: null,
  location: "Jakarta, Indonesia",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-01"),
};

export const fallbackProjects: ProjectModel[] = [
  {
    id: "project-fallback-1",
    title: "Dashboard Analitik",
    description: "Dashboard analitik real-time untuk memantau metrik produk dengan visualisasi data interaktif.",
    imageUrl: null,
    url: "https://example.com/dashboard",
    githubUrl: "https://github.com/username/dashboard-analitik",
    tags: ["Next.js", "Prisma", "Supabase", "Recharts"],
    featured: true,
    order: 0,
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-01"),
  },
  {
    id: "project-fallback-2",
    title: "Platform Belajar Online",
    description: "Platform kursus online dengan sistem manajemen materi, kuis, dan sertifikat.",
    imageUrl: null,
    url: "https://example.com/belajar",
    githubUrl: "https://github.com/username/platform-belajar",
    tags: ["Next.js", "Tailwind", "PostgreSQL"],
    featured: false,
    order: 1,
    createdAt: new Date("2025-03-15"),
    updatedAt: new Date("2025-03-15"),
  },
  {
    id: "project-fallback-3",
    title: "Aplikasi Catatan",
    description: "Aplikasi catatan berbasis keyboard dengan sinkronisasi lintas perangkat.",
    imageUrl: null,
    url: null,
    githubUrl: "https://github.com/username/aplikasi-catatan",
    tags: ["React", "TypeScript", "IndexedDB"],
    featured: false,
    order: 2,
    createdAt: new Date("2025-04-10"),
    updatedAt: new Date("2025-04-10"),
  },
];

export const fallbackSkills: SkillModel[] = [
  { id: "skill-fallback-1", name: "TypeScript", category: "Bahasa", order: 0 },
  { id: "skill-fallback-2", name: "Next.js", category: "Framework", order: 1 },
  { id: "skill-fallback-3", name: "React", category: "Framework", order: 2 },
  { id: "skill-fallback-4", name: "Tailwind CSS", category: "Styling", order: 3 },
  { id: "skill-fallback-5", name: "Prisma", category: "Database", order: 4 },
  { id: "skill-fallback-6", name: "PostgreSQL", category: "Database", order: 5 },
  { id: "skill-fallback-7", name: "Supabase", category: "Platform", order: 6 },
];

export const fallbackExperiences: ExperienceModel[] = [
  {
    id: "experience-fallback-1",
    role: "Frontend Engineer",
    company: "PT Teknologi Maju",
    companyUrl: "https://example.com",
    location: "Jakarta, Indonesia",
    startDate: new Date("2024-01-01"),
    endDate: null,
    current: true,
    description: "Mengembangkan fitur-fitur frontend untuk produk SaaS, meningkatkan performa halaman hingga 40%, dan membimbing developer junior.",
    order: 0,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
  {
    id: "experience-fallback-2",
    role: "Web Developer",
    company: "Startup Digital",
    companyUrl: null,
    location: "Bandung, Indonesia",
    startDate: new Date("2022-06-01"),
    endDate: new Date("2023-12-31"),
    current: false,
    description: "Membangun website dan aplikasi internal untuk klien, dari perancangan hingga deployment.",
    order: 1,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
];
