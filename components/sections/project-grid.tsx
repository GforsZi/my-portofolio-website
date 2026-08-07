import { ProjectCard } from "@/components/sections/project-card";
import type { ProjectModel } from "@/generated/prisma/models";

export function ProjectGrid({
  projects,
  emptyMessage = "Belum ada proyek.",
}: {
  projects: ProjectModel[];
  emptyMessage?: string;
}) {
  if (projects.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
