"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import HorizontalScroll, {
  type HorizontalScrollDirection,
} from "@/components/ui/horizontal-scroll";
import { siteConfig } from "@/content/site";
import type { ProjectModel } from "@/generated/prisma/models";
import { cn } from "@/lib/utils";

type ProjectSlideProps = {
  project: ProjectModel;
  direction: HorizontalScrollDirection;
};

function ProjectSlide({ project, direction }: ProjectSlideProps) {
  const mirrored = direction === "right";

  return (
    <Card className="h-[70vh] w-[85vw] flex-col justify-between sm:w-[75vw] md:flex-row md:items-center md:gap-10 lg:w-[60vw]">
      <div
        className={cn(
          "relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md bg-muted md:aspect-auto md:h-full md:max-w-[40%]",
          mirrored && "md:order-2"
        )}
      >
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 85vw, 40vw"
            className="object-cover grayscale transition duration-500 hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-heading text-6xl text-muted-foreground/40">
            {project.title.charAt(0)}
          </div>
        )}
      </div>
      <CardContent
        className={cn(
          "flex flex-col gap-4 md:max-w-[55%]",
          mirrored && "md:order-1"
        )}
      >
        {project.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
        <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
        {project.url || project.githubUrl ? (
          <div className="flex items-center gap-4 pt-2">
            {project.url ? (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                Kunjungi
              </Link>
            ) : null}
            {project.githubUrl ? (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                GitHub
              </Link>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function Project({ projects }: { projects: ProjectModel[] }) {
  return (
    <HorizontalScroll
      id="proyek"
      direction="right"
      heading={siteConfig.sections.projects}
    >
      {(direction) =>
        projects.map((project) => (
          <ProjectSlide
            key={project.id}
            project={project}
            direction={direction}
          />
        ))
      }
    </HorizontalScroll>
  );
}
