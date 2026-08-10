'use client';
import React, { useRef } from 'react';
import Blocks from '@/components/ui/blocks';

function BlockOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className='fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-background before:absolute before:z-1 before:h-full before:w-full before:bg-linear-to-t before:from-background before:to-transparent'
      ref={containerRef}
    >
      <Blocks
        activeDivsClass='dark:bg-[#131212]  bg-[#9ba1a131]  '
        divClass='dark:border-[#131212] border-[#9ba1a131] '
        classname='w-full'
        containerRef={containerRef}
        activeDivs={{
          0: new Set([2, 4, 6]),
          1: new Set([0, 8]),
          2: new Set([1, 3, 5]),
          4: new Set([0, 5, 8]),
          5: new Set([2, 4]),
          7: new Set([2, 6, 9]),
          8: new Set([0, 4]),
          9: new Set([5]),
          10: new Set([3, 6]),
          11: new Set([1, 5]),
          12: new Set([7]),
          13: new Set([2, 4]),
          14: new Set([5]),
          15: new Set([1, 6]),
          16: new Set([3, 6]),
        }}
      />
    </div>
  );
}

export default BlockOne;
