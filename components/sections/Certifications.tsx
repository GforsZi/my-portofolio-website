"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import HorizontalScroll, {
  type HorizontalScrollDirection,
} from "@/components/ui/horizontal-scroll";
import type { CertificationsModel } from "@/generated/prisma/models";
import { useRegisterBreadcrumb } from "@/hooks/use-register-breadcrumb";

type CertificationCardProps = {
  cert: CertificationsModel;
  direction: HorizontalScrollDirection;
};

function CertificationCard({ cert, direction }: CertificationCardProps) {
  const mirrored = direction === "right";

  return (
    <Card className="h-[70vh] w-[85vw] flex-col justify-between sm:w-[75vw] md:flex-row md:items-center md:gap-10 lg:w-[60vw]">
      <div
        className={cn(
          "relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md bg-muted md:aspect-auto md:h-full md:max-w-[40%]",
          mirrored && "md:order-2"
        )}
      >
        {cert.thumbnail ? (
          <Image
            src={cert.thumbnail}
            alt={cert.title}
            fill
            sizes="(max-width: 768px) 85vw, 40vw"
            className="object-cover p-4 grayscale transition duration-500 hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-heading text-6xl text-muted-foreground/40">
            {cert.title.charAt(0)}
          </div>
        )}
      </div>
      <CardContent
        className={cn(
          "flex flex-col gap-4 md:max-w-[55%]",
          mirrored && "md:order-1"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-sm text-muted-foreground" />
          <span className="rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground">
            {cert.releaseYear}
          </span>
        </div>
        <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {cert.title}
        </CardTitle>
        <CardDescription>{cert.description}</CardDescription>
        {cert.url ? (
          <Link
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Lihat sertifikat
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function Certifications({ certifications }: { certifications: CertificationsModel[] }) {
  if (certifications.length === 0) return null;
  useRegisterBreadcrumb("certifications", "Certifications");

  return (
    <HorizontalScroll id="certifications" heading="Certifications">
      {(direction) =>
        certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            cert={cert}
            direction={direction}
          />
        ))
      }
    </HorizontalScroll>
  );
}
