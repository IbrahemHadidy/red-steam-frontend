import { useState, useEffect } from 'react';

function useResponsiveViewports(width: number) {
  const [isViewport, setIsViewport] = useState(window.innerWidth <= width);

  useEffect(() => {
    const handleResize = () => {
      setIsViewport(window.innerWidth <= width);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return isViewport;
}

export default useResponsiveViewports;
