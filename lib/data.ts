import {
  fallbackCertifications,
  fallbackExperiences,
  fallbackNavigations,
  fallbackProjects,
  fallbackSettings,
  fallbackSkillCategories,
  fallbackSkills,
} from "@/content/site";
import type {
  ProjectWithSkills,
  SkillWithCategory,
} from "@/content/site";
import type {
  AppSettingsModel,
  CertificationsModel,
  ExperiencesModel,
  PageNavigationsModel,
  SkillCategoriesModel,
} from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";

// Data layer: semua akses data lewat satu tempat. Ketika database belum
// dikonfigurasi / gagal diakses, otomatis memakai fallback content dari
// content/site.ts sehingga halaman selalu bisa dirender.
//
// Saat database sudah aktif, cukup beri data di tabel terkait dan fungsi ini
// akan mengembalikan data asli dari database.

export async function getSettings(): Promise<AppSettingsModel[]> {
  try {
    const settings = await prisma.appSettings.findMany();
    return settings.length > 0 ? settings : fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}

export async function getNavigations(): Promise<PageNavigationsModel[]> {
  try {
    const navigations = await prisma.pageNavigations.findMany({
      orderBy: { position: "asc" },
    });
    return navigations.length > 0 ? navigations : fallbackNavigations;
  } catch {
    return fallbackNavigations;
  }
}

export async function getSkillCategories(): Promise<SkillCategoriesModel[]> {
  try {
    const categories = await prisma.skillCategories.findMany();
    return categories.length > 0 ? categories : fallbackSkillCategories;
  } catch {
    return fallbackSkillCategories;
  }
}

export async function getSkills(): Promise<SkillWithCategory[]> {
  try {
    const skills = await prisma.skills.findMany({
      orderBy: { order: "asc" },
      include: { category: true },
    });
    return skills.length > 0 ? skills : fallbackSkills;
  } catch {
    return fallbackSkills;
  }
}

export async function getProjects(): Promise<ProjectWithSkills[]> {
  try {
    const projects = await prisma.projects.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }],
      include: { skills: { include: { skill: true } } },
    });
    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getExperiences(): Promise<ExperiencesModel[]> {
  try {
    const experiences = await prisma.experiences.findMany({
      orderBy: [{ current: "desc" }, { startDate: "desc" }],
    });
    return experiences.length > 0 ? experiences : fallbackExperiences;
  } catch {
    return fallbackExperiences;
  }
}

export async function getCertifications(): Promise<CertificationsModel[]> {
  try {
    const certifications = await prisma.certifications.findMany({
      orderBy: { order: "asc" },
    });
    return certifications.length > 0 ? certifications : fallbackCertifications;
  } catch {
    return fallbackCertifications;
  }
}
