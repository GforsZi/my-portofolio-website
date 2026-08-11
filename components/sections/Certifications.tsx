"use client";

import Image from "next/image";
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

type Certification = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
};

const certifications: Certification[] = [
  {
    title: "Full Stack Web Developer",
    issuer: "Dicoding Indonesia",
    year: "2025",
    description:
      "Membangun aplikasi web lengkap dari frontend hingga backend menggunakan JavaScript, REST API, dan database.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  },
  {
    title: "Frontend Web Developer Expert",
    issuer: "Dicoding Indonesia",
    year: "2024",
    description:
      "Menguasai Progressive Web Apps, aksesibilitas, dan best practice performa untuk web modern.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  },
  {
    title: "Cloud Architect",
    issuer: "Google Cloud",
    year: "2024",
    description:
      "Merancang infrastruktur cloud yang scalable, aman, dan hemat biaya di Google Cloud Platform.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
  },
  {
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    year: "2023",
    description:
      "Mengembangkan dan men-deploy aplikasi serverless menggunakan layanan inti AWS.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
  },
  {
    title: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    year: "2023",
    description:
      "Menyelesaikan struktur data dan algoritma klasik untuk memecahkan masalah pemrograman.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
  },
];

type CertificationCardProps = {
  cert: Certification;
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
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          sizes="(max-width: 768px) 85vw, 40vw"
          className="object-cover grayscale transition duration-500 hover:grayscale-0"
        />
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
            {cert.year}
          </span>
        </div>
        <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {cert.title}
        </CardTitle>
        <p className="text-sm font-medium text-primary">{cert.issuer}</p>
        <CardDescription>{cert.description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default function Certifications() {
  return (
    <HorizontalScroll id="sertifikat" heading="Certifications">
      {(direction) =>
        certifications.map((cert) => (
          <CertificationCard
            key={cert.title}
            cert={cert}
            direction={direction}
          />
        ))
      }
    </HorizontalScroll>
  );
}
