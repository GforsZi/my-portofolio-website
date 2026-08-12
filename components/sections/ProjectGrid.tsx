import { ProjectCard } from "@/components/sections/ProjectCard";
import type { ProjectWithSkills } from "@/content/site";

export function ProjectGrid({
  projects,
  emptyMessage = "Belum ada proyek.",
}: {
  projects: ProjectWithSkills[];
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
