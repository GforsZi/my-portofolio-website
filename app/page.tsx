import Experiences from "@/components/sections/Experiences";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import Lanyard from "@/components/sections/Lanyard";
import AboutCard from "@/components/sections/AboutCard";
import Certifications from "@/components/sections/Certifications";
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
      <SkillsSection skills={skills} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-16 sm:px-8">
        <Separator />
        <AboutCard/>
        <Separator />
        <Experiences name="pengalaman" />
        <ProjectsSection projects={projects} />
      </div>
      <Certifications />
    </>
  );
}
