'use client';
import { useEffect, useState } from 'react';

const useResponsiveViewport = (width: number): boolean => {
  const [isViewport, setIsViewport] = useState(false);

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
};

export default useResponsiveViewport;
