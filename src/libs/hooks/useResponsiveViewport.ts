'use client';
import { useEffect, useState } from 'react';

/**
 * Custom hook to set responsive viewport
 * @param width The viewport width in pixels
 * @param delay The debounce delay in milliseconds
 * @returns The viewport state as a boolean
 */
export default function useResponsiveViewport(width: number, delay: number = 100): boolean {
  const [isViewport, setIsViewport] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      const newViewportState = window.innerWidth <= width;
      setIsViewport(newViewportState);
    };

    const debounceResize = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(handleResize, delay);
    };

    let debounceTimeout: NodeJS.Timeout;

    // Initial check
    handleResize();

    window.addEventListener('resize', debounceResize);

    return () => {
      clearTimeout(debounceTimeout); // Clear the timeout on cleanup
      window.removeEventListener('resize', debounceResize);
    };
  }, [width, delay]);

  return isViewport;
}
