"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

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

function useElementViewportPosition(ref: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const update = () => {
      const element = ref.current;
      if (!element) return;

      const pageHeight = document.body.scrollHeight;
      const start = element.offsetTop;
      const end = start + element.offsetHeight;

      setPosition([start / pageHeight, end / pageHeight]);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);

  return { position };
}

function throttle<A extends unknown[]>(fn: (...args: A) => void, wait: number) {
  let lastTime = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: A) => {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0) {
      lastTime = now;
      fn(...args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = Date.now();
        fn(...args);
      }, remaining);
    }
  };
}

export default function Certifications() {
  const mainRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { position } = useElementViewportPosition(mainRef);
  const [carouselEndPosition, setCarouselEndPosition] = useState(0);

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, position, [0, carouselEndPosition]);
  const progress = useTransform(scrollYProgress, position, [0, 1]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const parent = carousel.parentElement;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const resetCarouselEndPosition = () => {
      if (carouselRef.current) {
        const newPosition =
          carouselRef.current.clientWidth -
          window.innerWidth +
          scrollbarWidth +
          ((parent as HTMLElement).offsetLeft) * 2;

        setCarouselEndPosition(-newPosition);
      }
    };

    resetCarouselEndPosition();
    const handleResize = throttle(resetCarouselEndPosition, 10);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="sertifikat" ref={mainRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-24">
        <motion.div
          ref={carouselRef}
          style={{ x }}
          className="flex w-max items-center gap-6 px-6 sm:gap-10 sm:px-10"
        >
          <div className="flex h-screen w-screen shrink-0 flex-col justify-center gap-6">
          </div>

          {certifications.map((cert, i) => (
            <article
              key={cert.title}
              className="flex h-[70vh] w-[85vw] shrink-0 flex-col justify-between gap-6 overflow-hidden rounded-lg border bg-card p-6 sm:w-[75vw] md:flex-row md:items-center md:gap-10 lg:w-[60vw] lg:p-10"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted md:aspect-auto md:h-full md:max-w-[40%]">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 40vw"
                  className="object-cover grayscale transition duration-500 hover:grayscale-0"
                />
              </div>
              <div className="flex flex-col gap-4 md:max-w-[55%]">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground">
                    {cert.year}
                  </span>
                </div>
                <h3 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {cert.issuer}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {cert.description}
                </p>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute top-17 left-0 right-0 z-10 flex items-center justify-center gap-3">
            <h2 className='sm:text-7xl text-5xl font-semibold bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent leading-[100%] tracking-tighter'>
              Certifications
            </h2>
        </div>

      </div>
    </div>
  );
}
