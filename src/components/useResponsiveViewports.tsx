import { useState, useEffect } from 'react';

function useResponsiveViewports() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000);
  const [isMobileView740, setIsMobileView740] = useState(window.innerWidth <= 740);
  const [isMobileView630, setIsMobileView630] = useState(window.innerWidth <= 630);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1000);
      setIsMobileView740(window.innerWidth <= 740);
      setIsMobileView630(window.innerWidth <= 630);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobileView, isMobileView740, isMobileView630 };
}

export default useResponsiveViewports;
