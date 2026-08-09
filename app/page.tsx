import { About } from "@/components/sections/about";
import { ExperiencesSection } from "@/components/sections/experiences-section";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import Lanyard from "@/components/lanyard/lanyard";
import { Separator } from "@/components/ui/separator";
import { getExperiences, getProfile, getProjects, getSkills } from "@/lib/data";

export default async function Home() {
  const [profile, projects, skills, experiences] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getExperiences(),
  ]);

  return (
    <>
      <Lanyard  
        position={[0,0,12]}
        gravity={[0,-40,0]}
        imageFit="cover"
        lanyardWidth={0.40}
      />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-16 sm:px-8">
        <Hero profile={profile} />
        <Separator />
        <About profile={profile} />
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <ExperiencesSection experiences={experiences} />
      </div>
    </>
  );
}
