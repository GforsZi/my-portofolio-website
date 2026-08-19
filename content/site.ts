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

export const siteUrl = "https://givaldi-gumelar-setiawan109.vercel.app";
export const siteAuthor = "Givaldi Gumelar Setiawan";
export const siteKeywords = [
  "portofolio",
  "portfolio",
  "web developer",
  "backend developer",
  "full-stack developer",
  "software engineer",
  "laravel",
  "filament",
  "livewire",
  "next.js",
  "react",
  "typescript",
  "givaldi gumelar setiawan",
];

export const siteConfig = {
  name: "Portofolio (eary access)",
  description: "Personal portfolio built with Next.js, Tailwind CSS, shadcn/ui, and Prisma.",
  navLinks: [
    { href: "/", label: "Welcome" },
    { href: "/settings", label: "Setting" },
    { href: "/pengalaman", label: "Pengalaman" },
    { href: "/keahlian", label: "Keahlian" },
  ],
  socials: {
    github: "https://github.com/username",
    linkedin: "https://www.linkedin.com/in/username",
    instagram: "https://x.com/username",
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
  { id: "app-setting-site-name", type: "site", key: "name", title: "Nama Situs", value: "Portofolio", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-site-description", type: "site", key: "description", title: "Deskripsi Situs", value: "Personal portfolio built with Next.js, Tailwind CSS, shadcn/ui, and Prisma.", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-social-github", type: "social", key: "github", title: "GitHub", value: "https://github.com/GforsZi", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-social-linkedin", type: "social", key: "linkedin", title: "LinkedIn", value: "https://www.linkedin.com/in/givaldi-gumelar-setiawan-4a988a356/", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-social-instagram", type: "social", key: "instagram", title: "Instagram", value: "https://www.instagram.com/givaldigumelarsetiawan", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-social-email", type: "social", key: "email", title: "Email", value: "mailto:hello@example.com", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-profile-name", type: "profile", key: "name", title: "Nama", value: "Givaldi Gumelar Setiawan", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-profile-headline", type: "profile", key: "headline", title: "Headline", value: "Full-stack Engineer", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-profile-bio", type: "profile", key: "bio", title: "Bio", value: "Full-stack Developer dengan fokus pada ekosistem monolith berbasis Laravel, nextjs, Fastapi, dan pengembangan API berbasis Python, Nodejs, Golang. Berpengalaman menangani siklus pengembangan end-to-end dari perancangan database, integrasi API pihak ketiga (Midtrans, Fonnte, OAuth2), hingga deployment  untuk lebih dari 6 project klien berbeda selama masa magang dan freelance. Terbiasa membangun sistem dengan role-based access control dan arsitektur yang dapat direplikasi untuk kebutuhan multi-klien.", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "app-setting-profile-location", type: "profile", key: "location", title: "Lokasi", value: "Bandung, Indonesia", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
];

export const fallbackNavigations: PageNavigationsModel[] = [
  { id: "page-nav-proyek", label: "Proyek", position: 0, type: "link", data: { url: "/proyek" }, createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "page-nav-tentang", label: "Tentang", position: 1, type: "link", data: { url: "/#tentang" }, createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "page-nav-pengalaman", label: "Pengalaman", position: 2, type: "link", data: { url: "/#pengalaman" }, createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "page-nav-keahlian", label: "Keahlian", position: 3, type: "link", data: { url: "/#keahlian" }, createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
];

export const fallbackSkillCategories: SkillCategoriesModel[] = [
  { id: "skill-category-bahasa", name: "Bahasa Pemrograman", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-framework", name: "Framework", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-library", name: "Library", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-database", name: "Database", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-tools", name: "Tools", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-os", name: "OS", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
  { id: "skill-category-cli", name: "CLI Utility", createdAt: ts("2025-01-01"), updatedAt: ts("2025-01-01") },
];

export type SkillWithCategory = SkillsModel & { category: SkillCategoriesModel };

// Daftar skill mengikuti nama file di public/img/skill/*.svg.
const skillDefs: { file: string; name: string; categoryId: string }[] = [
  // Bahasa Pemrograman
  { file: "css", name: "CSS", categoryId: "skill-category-bahasa" },
  { file: "go", name: "Go", categoryId: "skill-category-bahasa" },
  { file: "html5", name: "HTML5", categoryId: "skill-category-bahasa" },
  { file: "javascript", name: "JavaScript", categoryId: "skill-category-bahasa" },
  { file: "php", name: "PHP", categoryId: "skill-category-bahasa" },
  { file: "python", name: "Python", categoryId: "skill-category-bahasa" },
  { file: "typescript", name: "TypeScript", categoryId: "skill-category-bahasa" },
  // Framework
  { file: "express", name: "Express", categoryId: "skill-category-framework" },
  { file: "fastapi", name: "FastAPI", categoryId: "skill-category-framework" },
  { file: "filament", name: "Filament", categoryId: "skill-category-framework" },
  { file: "gin", name: "Gin", categoryId: "skill-category-framework" },
  { file: "laravel", name: "Laravel", categoryId: "skill-category-framework" },
  { file: "livewire", name: "Livewire", categoryId: "skill-category-framework" },
  { file: "nestjs", name: "NestJS", categoryId: "skill-category-framework" },
  { file: "nextdotjs", name: "Next.js", categoryId: "skill-category-framework" },
  { file: "nodedotjs", name: "Node.js", categoryId: "skill-category-framework" },
  { file: "tailwindcss", name: "Tailwind CSS", categoryId: "skill-category-framework" },
  { file: "vuedotjs", name: "Vue.js", categoryId: "skill-category-framework" },
  // Library
  { file: "gsap", name: "GSAP", categoryId: "skill-category-library" },
  { file: "prisma", name: "Prisma", categoryId: "skill-category-library" },
  { file: "react", name: "React", categoryId: "skill-category-library" },
  { file: "shadcnui", name: "shadcn/ui", categoryId: "skill-category-library" },
  { file: "sqlalchemy", name: "SQLAlchemy", categoryId: "skill-category-library" },
  // Database
  { file: "firebase", name: "Firebase", categoryId: "skill-category-database" },
  { file: "mysql", name: "MySQL", categoryId: "skill-category-database" },
  { file: "supabase", name: "Supabase", categoryId: "skill-category-database" },
  // Tools
  { file: "cpanel", name: "cPanel", categoryId: "skill-category-tools" },
  { file: "docker", name: "Docker", categoryId: "skill-category-tools" },
  { file: "github", name: "GitHub", categoryId: "skill-category-tools" },
  { file: "opencode", name: "opencode", categoryId: "skill-category-tools" },
  { file: "openrouter", name: "OpenRouter", categoryId: "skill-category-tools" },
  { file: "postman", name: "Postman", categoryId: "skill-category-tools" },
  { file: "vercel", name: "Vercel", categoryId: "skill-category-tools" },
  { file: "vite", name: "Vite", categoryId: "skill-category-tools" },
  // OS
  { file: "hyprland", name: "Hyprland", categoryId: "skill-category-os" },
  { file: "linux", name: "Linux", categoryId: "skill-category-os" },
  { file: "nixos", name: "NixOS", categoryId: "skill-category-os" },
  // CLI Utility
  { file: "git", name: "Git", categoryId: "skill-category-cli" },
  { file: "gnubash", name: "GNU Bash", categoryId: "skill-category-cli" },
  { file: "neovim", name: "Neovim", categoryId: "skill-category-cli" },
  { file: "tmux", name: "tmux", categoryId: "skill-category-cli" },
];

const skillCategoryById = new Map(
  fallbackSkillCategories.map((category) => [category.id, category]),
);

export const fallbackSkills: SkillWithCategory[] = skillDefs.map(
  ({ file, name, categoryId }, order) => ({
    id: `skill-${file}`,
    name,
    slug: file,
    order,
    imgUrl: `/img/skill/${file}.svg`,
    skillCategoryId: categoryId,
    category: skillCategoryById.get(categoryId)!,
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
  }),
);

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
    id: "project-custom-app",
    title: "Custom App",
    description:
      "custom-app adalah solusi enterprise siap pakai yang dibangun dengan ekosistem Laravel/Vue modern. Fondasinya modular sehingga dapat disesuaikan dengan kebutuhan bisnis — mulai dari alur kerja khusus, konfigurasi multi-tenant, hingga antarmuka administrasi — tanpa mengorbankan kemudahan perawatan.",
    thumbnail: "/img/project/custom_app.webp",
    url: "https://github.com/username/custom-app",
    githubUrl: "https://github.com/username/custom-app",
    featured: true,
    order: 0,
    createdAt: ts("2025-02-01"),
    updatedAt: ts("2025-02-01"),
    skills: [
      projectSkill("project-custom-app", skillBySlug.get("laravel")!),
      projectSkill("project-custom-app", skillBySlug.get("vuedotjs")!),
      projectSkill("project-custom-app", skillBySlug.get("php")!),
      projectSkill("project-custom-app", skillBySlug.get("mysql")!),
    ],
  },
  {
    id: "project-matcha-aquatics",
    title: "Matcha Aquatics",
    description:
      "Matcha Aquatics adalah aplikasi e-catalog modern untuk pengalaman belanja perlengkapan akuatik yang efisien dan interaktif. Dilengkapi integrasi pembayaran Midtrans, perhitungan ongkir RajaOngkir, autentikasi Google OAuth2, serta antarmuka responsif dengan React.js, Tailwind CSS, dan shadcn/ui.",
    thumbnail: "/img/project/matcha_aquatics.webp",
    url: "https://github.com/username/matcha-aquatics",
    githubUrl: "https://github.com/username/matcha-aquatics",
    featured: false,
    order: 1,
    createdAt: ts("2025-03-15"),
    updatedAt: ts("2025-03-15"),
    skills: [
      projectSkill("project-matcha-aquatics", skillBySlug.get("react")!),
      projectSkill("project-matcha-aquatics", skillBySlug.get("tailwindcss")!),
      projectSkill("project-matcha-aquatics", skillBySlug.get("shadcnui")!),
    ],
  },
  {
    id: "project-petra",
    title: "Petra",
    description:
      "Sistem manajemen perpustakaan dengan role-based access control, pengelolaan label salinan buku, kartu anggota, dan ekspor laporan seluruh data di database. Peminjaman buku dikelola otomatis dengan notifikasi pengingat pengembalian lewat integrasi Fonnte API, sehingga menghilangkan human-error dalam pencatatan buku.",
    thumbnail: "/img/project/petra.webp",
    url: "https://github.com/username/petra",
    githubUrl: "https://github.com/username/petra",
    featured: false,
    order: 2,
    createdAt: ts("2025-04-10"),
    updatedAt: ts("2025-04-10"),
    skills: [
      projectSkill("project-petra", skillBySlug.get("php")!),
      projectSkill("project-petra", skillBySlug.get("laravel")!),
      projectSkill("project-petra", skillBySlug.get("mysql")!),
    ],
  },
];

export const fallbackExperiences: ExperiencesModel[] = [
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
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
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
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
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
    createdAt: ts("2025-01-01"),
    updatedAt: ts("2025-01-01"),
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
