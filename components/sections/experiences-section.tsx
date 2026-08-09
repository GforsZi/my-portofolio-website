import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/content/site";
import type { ExperienceModel } from "@/generated/prisma/models";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric" }).format(date);
}

function formatPeriod(experience: ExperienceModel) {
  const start = formatDate(experience.startDate);
  if (experience.current) return `${start} – Sekarang`;
  return experience.endDate ? `${start} – ${formatDate(experience.endDate)}` : start;
}

export function ExperiencesSection({ experiences }: { experiences: ExperienceModel[] }) {
  if (experiences.length === 0) return null;

  return (
    <section id="pengalaman" className="scroll-mt-20 flex flex-col gap-4">
      <h2 data-animate="fade-up" className="font-heading text-lg font-medium">{siteConfig.sections.experiences}</h2>
      <ol className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <li key={experience.id} data-animate="fade-up">
            <Card>
              <CardHeader>
                <CardTitle>{experience.role}</CardTitle>
                <CardDescription>
                  {experience.company}
                  {experience.location ? ` · ${experience.location}` : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground">{formatPeriod(experience)}</p>
                {experience.description ? (
                  <p className="text-sm text-muted-foreground">{experience.description}</p>
                ) : null}
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}
