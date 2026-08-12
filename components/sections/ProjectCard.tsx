import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectWithSkills } from "@/content/site";

export function ProjectCard({ project }: { project: ProjectWithSkills }) {
  return (
    <Card>
      <CardHeader>
      {project.thumbnail ? (
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={800}
          height={450}
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 rounded"
        />
      ) : (
        <div className="relative z-20 flex aspect-video w-full items-center justify-center rounded bg-muted font-heading text-4xl text-muted-foreground/40">
          {project.title.charAt(0)}
        </div>
      )}
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      {project.skills.length > 0 ? (
        <CardContent className="flex flex-wrap gap-2">
          {project.skills.map(({ skill }) => (
            <Badge key={skill.id} variant="secondary">
              {skill.name}
            </Badge>
          ))}
        </CardContent>
      ) : null}
      {project.url || project.githubUrl ? (
        <CardFooter className="flex items-center gap-2">
          {project.url ? (
            <Link href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline-offset-4 hover:underline">
              Kunjungi
            </Link>
          ) : null}
          {project.githubUrl ? (
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              GitHub
            </Link>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
