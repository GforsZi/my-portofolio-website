import Experiences from "@/components/sections/Experiences";
import Project from "@/components/sections/Project";
import { SkillsSection } from "@/components/sections/SkillsSection";
import Lanyard from "@/components/sections/Lanyard";
import AboutCard from "@/components/sections/AboutCard";
import Certifications from "@/components/sections/Certifications";
import { Separator } from "@/components/ui/separator";
import { getCertifications, getExperiences, getProjects, getSettings, getSkills } from "@/lib/data";

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
      <Lanyard  
        position={[0,0,12]}
        gravity={[0,-40,0]}
        frontImage="/lanyard/front.png"
        backImage="/lanyard/back.png"
        imageFit="cover"
        lanyardWidth={0.40}
      />
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
