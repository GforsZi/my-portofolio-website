import {
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
} from "@/content/site";
import type {
  ExperienceModel,
  ProfileModel,
  ProjectModel,
  SkillModel,
} from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";

// Data layer: semua akses data lewat satu tempat. Ketika database belum
// dikonfigurasi / gagal diakses, otomatis memakai fallback content dari
// content/site.ts sehingga halaman selalu bisa dirender.
//
// Saat database sudah aktif, cukup beri data di tabel terkait dan fungsi ini
// akan mengembalikan data asli dari database.

export async function getProfile(): Promise<ProfileModel> {
  try {
    const profile = await prisma.profile.findFirst();
    return profile ?? fallbackProfile;
  } catch {
    return fallbackProfile;
  }
}

export async function getProjects(): Promise<ProjectModel[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    });
    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getSkills(): Promise<SkillModel[]> {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return skills.length > 0 ? skills : fallbackSkills;
  } catch {
    return fallbackSkills;
  }
}

export async function getExperiences(): Promise<ExperienceModel[]> {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ current: "desc" }, { startDate: "desc" }],
    });
    return experiences.length > 0 ? experiences : fallbackExperiences;
  } catch {
    return fallbackExperiences;
  }
}
