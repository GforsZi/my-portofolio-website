import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/content/site";
import type { SkillModel } from "@/generated/prisma/models";

export function SkillsSection({ skills }: { skills: SkillModel[] }) {
  if (skills.length === 0) return null;

  return (
    <section id="keahlian" className="scroll-mt-20 flex flex-col gap-4">
      <h2 className="font-heading text-lg font-medium">{siteConfig.sections.skills}</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill.id} variant="secondary">
            {skill.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}
