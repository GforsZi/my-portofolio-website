import Link from "next/link";

import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: siteConfig.sections.projectsPageTitle,
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const projects = await getProjects();

  const tags = [...new Set(projects.flatMap((project) => project.tags))].sort();
  const filtered = tag ? projects.filter((project) => project.tags.includes(tag)) : projects;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {siteConfig.sections.projectsPageTitle}
        </h1>
        <p className="text-muted-foreground">{siteConfig.sections.projectsPageDescription}</p>
      </div>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant={!tag ? "default" : "outline"}>
            <Link href="/proyek">Semua</Link>
          </Button>
          {tags.map((name) => (
            <Button
              asChild
              key={name}
              size="sm"
              variant={tag === name ? "default" : "outline"}
            >
              <Link href={`/proyek?tag=${encodeURIComponent(name)}`}>{name}</Link>
            </Button>
          ))}
        </div>
      ) : null}

      <ProjectGrid projects={filtered} emptyMessage="Tidak ada proyek dengan filter ini." />
    </div>
  );
}
