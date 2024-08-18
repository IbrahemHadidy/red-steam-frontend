'use client';
import { useEffect } from 'react';

const useDynamicBackground = (background: string, dependencyArray?: unknown[]): void => {
  useEffect(() => {
    document.body.style.background = background;
    return () => {
      document.body.style.background = '';
    };
  }, [background, dependencyArray]);
};

export default useDynamicBackground;
