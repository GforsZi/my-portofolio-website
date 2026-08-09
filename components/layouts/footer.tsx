"use client";

import Link from "next/link";

import { siteConfig } from "@/content/site";
import { useEffect, useRef } from "react";

const footerLinks = [
  { href: siteConfig.socials.github, label: "GitHub" },
  { href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { href: siteConfig.socials.twitter, label: "Twitter" },
];

const email = "mohammadbayurizkii@gmail.com";
const marqueeRows = [
  [
    "Givaldi Gumelar Setiawan",
    "Software Engineer",
    "Full-stack Developer",
    "Linux Enthusiast"
  ],
  [
    "PHP Python Golang Nodejs Typescript",
    "Laravel Nextjs FastAPI Expressjs Nestjs",
    "Livewire React Vue Vite",
    "Neovim Opencode Git Bash Docker"
  ],
  [
    "UX Research",
    "Analytics Dashboards",
    "Creative Development",
    "Practical Problem Solving"
  ]
];
const baseRows = [
  {
    direction: 1,
    speed: 0.38
  },
  {
    direction: -1,
    speed: 0.54
  },
  {
    direction: 1,
    speed: 0.72
  }
];

export function Footer() {
  const viewportRefs = useRef<Array<HTMLElement | null>>([]);
  const trackRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const rows = baseRows.map((row, index) => ({
      ...row,
      offset: 0,
      setWidth: 0,
      velocity: row.direction * row.speed,
      viewport: viewportRefs.current[index],
      track: trackRefs.current[index]
    }));

    let animationId = 0;
    let lastFrame = performance.now();

    const measure = () => {
      rows.forEach((row) => {
        const firstSet = row.track?.firstElementChild;

        if (!(firstSet instanceof HTMLElement)) {
          return;
        }

        const previousWidth = row.setWidth;
        row.setWidth = firstSet.getBoundingClientRect().width;

        if (!previousWidth && row.setWidth) {
          row.offset = row.setWidth;
        }
      });
    };

    const wrap = (row: (typeof rows)[number]) => {
      if (!row.setWidth) {
        return;
      }

      while (row.offset >= row.setWidth * 2) {
        row.offset -= row.setWidth;
      }

      while (row.offset < row.setWidth) {
        row.offset += row.setWidth;
      }
    };

    const animate = (time: number) => {
      const frameDelta = Math.min(2.2, Math.max(0.45, (time - lastFrame) / 16.67));
      lastFrame = time;

      rows.forEach((row) => {
        if (!row.track) {
          return;
        }

        const cruise = row.direction * row.speed;
        row.velocity += (cruise - row.velocity) * (1 - Math.pow(0.97, frameDelta));
        row.offset += row.velocity * frameDelta;
        wrap(row);
        row.track.style.transform = `translate3d(${-row.offset}px, 0, 0)`;
      });

      animationId = window.requestAnimationFrame(animate);
    };

    const wheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (!delta) {
        return;
      }

      const direction = delta >= 0 ? 1 : -1;

      rows.forEach((row, index) => {
        row.direction = index === 1 ? -direction : direction;
        row.velocity += delta * (0.028 + index * 0.01);
        row.velocity = Math.max(-26, Math.min(26, row.velocity));
      });
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);

    rows.forEach((row) => {
      if (row.viewport) {
        resizeObserver.observe(row.viewport);
      }

      if (row.track) {
        resizeObserver.observe(row.track);
      }
    });

    window.addEventListener("wheel", wheel, { passive: true });
    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("wheel", wheel);
    };
  }, []);
  return (

    <footer
      className="site-footer relative overflow-hidden border-t px-4 pb-20 md:px-8 md:pb-34"
    >
    {/* <footer className="border-t bg-background"> */}
    {/*   <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-8"> */}
    {/*     <p>© {new Date().getFullYear()} {siteConfig.name}</p> */}
    {/*     <div className="flex items-center gap-4"> */}
    {/*       {footerLinks.map((link) => ( */}
    {/*         <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"> */}
    {/*           {link.label} */}
    {/*         </Link> */}
    {/*       ))} */}
    {/*     </div> */}
    {/*   </div> */}
    {/* </footer> */}
      <div className="grid min-w-0 content-between gap-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <p data-footer-link>© {new Date().getFullYear()} {siteConfig.name}</p>
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <Link data-footer-link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

        <a
          data-footer-email
          href={`mailto:${email}`}
          className="block min-w-0 max-w-full transition-colors "
        >
          <span className="sr-only">{email}</span>
          <span aria-hidden="true" className="grid gap-1 md:gap-2">
            {baseRows.map((row, rowIndex) => (
              <span
                key={rowIndex}
                ref={(node) => {
                  viewportRefs.current[rowIndex] = node;
                }}
                className="footer-name-marquee block overflow-hidden"
              >
                <span
                  ref={(node) => {
                    trackRefs.current[rowIndex] = node;
                  }}
                  className="flex w-max will-change-transform"
                >
                  {[0, 1, 2].map((copyIndex) => (
                    <span key={copyIndex} className="flex shrink-0">
                      {Array.from({ length: 6 }).map((_, itemIndex) => (
                        <span
                          key={`${copyIndex}-${itemIndex}`}
                          className="footer-name-item shrink-0 pr-[0.45em] font-medium leading-[0.88]"
                        >
                          {
                            marqueeRows[rowIndex][
                              itemIndex % marqueeRows[rowIndex].length
                            ]
                          }
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </span>
        </a>
      </div>
    </footer>
  );
}
