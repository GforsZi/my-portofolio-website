'use client';
import { useEffect, useRef } from 'react';
import { Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ExperiencesModel } from '@/generated/prisma/models';
import { useRegisterBreadcrumb } from "@/hooks/use-register-breadcrumb";

gsap.registerPlugin(ScrollTrigger);

function formatPeriod(startDate: Date, endDate: Date | null, current: boolean): string {
  const start = startDate.getFullYear();
  const end = current || !endDate ? 'Sekarang' : endDate.getFullYear();
  return start === end ? `${start}` : `${start} - ${end}`;
}

interface ExperiencesItemProps {
  role: string;
  company: string;
  companyUrl: string | null;
  location: string | null;
  period: string;
  description: string;
  isLast?: boolean;
}

function ExperiencesItem({ role, company, companyUrl, location, period, description, isLast }: ExperiencesItemProps) {
  return (
    <div className='study-item relative pl-10 pb-10 last:pb-0'>
      {!isLast && (
        <span className='study-line absolute left-[15px] top-8 bottom-0 w-px bg-border' />
      )}
      <span className='absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground overflow-hidden ring-4 ring-background'>
        <Briefcase className='h-4 w-4' />
      </span>
      <span className='mb-1 inline-block text-xs font-medium text-muted-foreground'>
        {period}
      </span>
      <div className='rounded-lg border border-border bg-card p-4 text-left shadow-sm'>
        <h3 className='text-lg font-semibold text-foreground'>{role}</h3>
        <h4 className='mt-1 flex items-center gap-2 text-sm italic font-medium text-muted-foreground before:mr-2 before:block before:h-px before:w-4 before:bg-primary'>
          {companyUrl ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className='transition-colors hover:text-foreground'
            >
              {company}
            </a>
          ) : (
            company
          )}
          {location ? <span className='text-xs'>{location}</span> : null}
        </h4>
        <div className='mt-3 text-sm whitespace-pre-line text-muted-foreground'>{description}</div>
      </div>
    </div>
  );
}

interface ExperiencesProps {
  experiences: ExperiencesModel[];
}

function Experiences({ experiences }: ExperiencesProps) {
  useRegisterBreadcrumb("experiences", "Experiences");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) return;

    const items = section.querySelectorAll('.study-item');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.study-heading'),
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.study-line'),
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.7,
          ease: 'power2.inOut',
          stagger: 0.12,
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section id="experiences" ref={sectionRef} className=' flex flex-col items-center justify-center pt-8 px-4 pb-16'>
      <h2  className='study-heading sm:text-7xl pb-10 text-5xl font-semibold text-center bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent leading-[100%] tracking-tighter'>
        Experiences
      </h2>
      <div className='w-full max-w-2xl'>
        {experiences.map((experience, i) => (
          <ExperiencesItem
            key={experience.id}
            role={experience.role}
            company={experience.company}
            companyUrl={experience.companyUrl}
            location={experience.location}
            period={formatPeriod(experience.startDate, experience.endDate, experience.current)}
            description={experience.description}
            isLast={i === experiences.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

export default Experiences;
