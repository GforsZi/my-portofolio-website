'use client';
import { ReactNode, useEffect, useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import unn from '@/assets/images/unn.png';
// import bachelor from '@/assets/images/3il.png';
// import ccnb from '@/assets/images/ccnb.png';

gsap.registerPlugin(ScrollTrigger);

const STUDY_ITEMS: {
  period: string;
  position: string;
  companyName: string;
  logo?: StaticImageData;
  myTasks: ReactNode | string;
}[] = [
  {
    period: '2019 - 2022',
    position: 'Lobachevsky University',
    companyName: 'Nizhny Novgorod, Russia',
    // logo: unn,
    myTasks: 'Bachelor - Institute of Information Technology, Mathematics and Mechanics',
  },
  {
    period: '2015 - 2016',
    position: '3IL Limoges',
    companyName: 'Limoges, France',
    // logo: bachelor,
    myTasks: 'Diploma in information system design',
  },
  {
    period: '2013 - 2014',
    position: 'New Brunswick Community College',
    companyName: 'New Brunswick, Canada',
    // logo: ccnb,
    myTasks: 'DEC Analysis and Programming',
  },
];

interface ExperiencesItemProps {
  position: string;
  companyName: string;
  myTasks: ReactNode | string;
  period: string;
  logo?: StaticImageData;
  isLast?: boolean;
}

// Sub-component timeline item — inline karena cukup ringan untuk digabung
function ExperiencesItem({ position, companyName, myTasks, period, logo, isLast }: ExperiencesItemProps) {
  return (
    <div className='study-item relative pl-10 pb-10 last:pb-0'>
      {!isLast && (
        <span className='study-line absolute left-[15px] top-8 bottom-0 w-px bg-border' />
      )}
      <span className='absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground overflow-hidden ring-4 ring-background'>
        {logo ? (
          <Image src={logo} alt={`${companyName} logo`} width={32} height={32} className='object-contain' />
        ) : (
          <GraduationCap className='h-4 w-4' />
        )}
      </span>
      <span className='mb-1 inline-block text-xs font-medium text-muted-foreground'>
        {period}
      </span>
      <div className='rounded-lg border border-border bg-card p-4 text-left shadow-sm'>
        <h3 className='text-lg font-semibold text-foreground'>{position}</h3>
        <h4 className='mt-1 flex items-center text-sm italic font-medium text-muted-foreground before:mr-2 before:block before:h-px before:w-4 before:bg-primary'>
          {companyName}
        </h4>
        <div className='mt-3 text-sm text-muted-foreground'>{myTasks}</div>
      </div>
    </div>
  );
}

interface ExperiencesProps {
  name: string;
}

function Experiences({ name }: ExperiencesProps) {
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

  return (
    <section id={name} ref={sectionRef} className=' flex flex-col items-center justify-center pt-8 px-4 pb-16'>
      <h2  className='study-heading sm:text-7xl pb-10 text-5xl font-semibold text-center bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent leading-[100%] tracking-tighter'>
        Experience
      </h2>
      <div className='w-full max-w-2xl'>
        {STUDY_ITEMS.map((item, i) => (
          <ExperiencesItem
            key={item.position}
            {...item}
            isLast={i === STUDY_ITEMS.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

export default Experiences;
