'use client';
import { useEffect, useState } from 'react';

function useResponsiveViewport(width: number) {
  const [isViewport, setIsViewport] = useState(false);

  useEffect(() => {
    const handleResize = () => {
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

export default useResponsiveViewport;
