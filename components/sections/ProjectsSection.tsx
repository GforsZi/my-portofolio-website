import Link from "next/link";

import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import type { ProjectWithSkills } from "@/content/site";

export function ProjectsSection({ projects }: { projects: ProjectWithSkills[] }) {
  return (
    <section id="proyek" className="scroll-mt-20 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-medium">{siteConfig.sections.projects}</h2>
        <Button asChild variant="link" size="sm" className="text-muted-foreground">
          <Link href="/proyek">Lihat semua</Link>
        </Button>
      </div>
      <ProjectGrid projects={projects} />
    </section>
  );
}
