'use client';
import { useEffect } from 'react';

import fluidCursor from '../hooks/FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className='pointer-events-none fixed inset-0 z-40'>
      <canvas id='fluid' className='pointer-events-none h-full w-full' />
    </div>
  );
};
export default FluidCursor;

