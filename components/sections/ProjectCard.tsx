import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectModel } from "@/generated/prisma/models";

export function ProjectCard({ project }: { project: ProjectModel }) {
  return (
    <Card>
      <CardHeader>
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 rounded"
      />
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      {project.tags.length > 0 ? (
        <CardContent className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
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
