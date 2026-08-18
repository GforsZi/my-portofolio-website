"use client"
import Earth from '@/components/ui/globe';
import { getSetting } from '@/content/site';
import type { AppSettingsModel } from '@/generated/prisma/models';
import { useRegisterBreadcrumb } from "@/hooks/use-register-breadcrumb";

export default function AboutCard({ settings }: { settings: AppSettingsModel[] }) {
  const name = getSetting(settings, 'profile', 'name') ?? '';
  const headline = getSetting(settings, 'profile', 'headline') ?? '';
  const bio = getSetting(settings, 'profile', 'bio') ?? '';
  const location = getSetting(settings, 'profile', 'location') ?? '';
  const avatar = getSetting(settings, 'profile', 'avatar') ?? '';
  useRegisterBreadcrumb("about", "About");

  return (
    <div id="about" className='overflow-hidden'>
      <article className='w-full overflow-hidden mx-auto mt-6 p-5 border rounded-lg relative'>
        <div className='absolute top-0 left-0 z-[1] h-full w-full bg-background bg-[radial-gradient(#83838352_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]'></div>

        <div className='relative z-10 pt-4 h-full'>
          <h1 className='sm:text-7xl text-5xl font-semibold text-center bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent leading-[100%] tracking-tighter'>
            About
          </h1>
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={name}
              className='mx-auto mt-4 h-28 w-28 rounded-full object-cover ring-4 ring-border'
            />
          ) : null}
          <Earth
            mapBrightness={6}
            dark={0}
            baseColor={[1, 1, 1]}
            glowColor={[1, 1, 1]}
          />
          <div className='rich-content max-w-[600px] mx-auto mt-4 px-4 pb-6 sm:text-lg text-base text-justify text-foreground leading-relaxed'>
            <h2 className='font-heading text-2xl font-semibold text-center sm:text-3xl'>
              {name}
            </h2>
            <p className='text-center text-sm font-medium text-primary sm:text-base'>
              {headline}
            </p>
            <p className='mt-4'>
              {bio}
            </p>
            <p className='mt-4 text-center text-sm text-muted-foreground'>
              {location}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
