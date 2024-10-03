'use client';
import { useEffect, useState } from 'react';

/**
 * Custom hook to set responsive viewport
 * @param width The viewport width in pixels
 * @returns The viewport state as a boolean
 */
export default function useResponsiveViewport(width: number): boolean {
  const [isViewport, setIsViewport] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsViewport(window.innerWidth <= width);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  return isViewport;
}
