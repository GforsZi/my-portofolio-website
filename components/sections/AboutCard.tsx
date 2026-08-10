import Earth from '@/components/ui/globe';
import React from 'react';

export default function AboutCard() {
  return (
    <>
      <div id="tentang" className='overflow-hidden'>
        <article className='w-full overflow-hidden mx-auto mt-6 p-5 border rounded-lg relative'>
          <div className='absolute top-0 left-0 z-[1] h-full w-full bg-background bg-[radial-gradient(#83838352_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]'></div>

          <div className='relative z-10 pt-4 h-full'>
            <h1 className='sm:text-7xl text-5xl font-semibold text-center bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent leading-[100%] tracking-tighter'>
              About
            </h1>
            <Earth
              mapBrightness={6}
              dark={0}
              baseColor={[1, 1, 1]}
              glowColor={[1, 1, 1]}
            />
            <div className='rich-content max-w-[600px] mx-auto mt-4 px-4 pb-6 sm:text-lg text-base text-justify text-foreground leading-relaxed'>
              <p>
                Ciptakan karya visual yang memukau dengan presisi dan detail terbaik. Setiap elemen dirancang untuk memberikan pengalaman yang tak terlupakan.
              </p>
              <ul>
                <li>hallo</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}


