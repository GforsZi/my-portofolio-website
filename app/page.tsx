import type { Metadata } from "next";
import Experiences from "@/components/sections/Experiences";
import Project from "@/components/sections/Project";
import { SkillsSection } from "@/components/sections/SkillsSection";
import AboutCard from "@/components/sections/AboutCard";
import Hero from "@/components/sections/Hero";
import Certifications from "@/components/sections/Certifications";
import { Separator } from "@/components/ui/separator";
import { getCertifications, getExperiences, getProjects, getSettings, getSkills } from "@/lib/data";

export const metadata: Metadata = {
  title: "Givaldi Gumelar Setiawan — Portofolio Web Developer",
  description: "Portofolio Givaldi Gumelar Setiawan — Web Developer (Backend & Full-stack) dengan fokus pada Laravel, Filament, Next.js, dan React.",
};

export default async function Home() {
  const [settings, projects, skills, experiences, certifications] = await Promise.all([
    getSettings(),
    getProjects(),
    getSkills(),
    getExperiences(),
    getCertifications(),
  ]);


  return (
    <>
      <Hero/>
      <SkillsSection skills={skills} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-16 sm:px-8">
        <Separator />
        <AboutCard settings={settings} />
        <Separator />
        <Experiences name="pengalaman" experiences={experiences} />
      </div>
        <Project projects={projects} />
      <Certifications certifications={certifications} />
    </>
  );
}
