import React, { useState, useEffect } from "react";
import "./Featured/Featured.css";
import FeaturedDesktop from "./Featured/Desktop/FeaturedDesktop";
import FeaturedMobile from "./Featured/Mobile/FeaturedMobile";


const Featured: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobileView ? <FeaturedMobile /> : <FeaturedDesktop />}
    </div>
  );
}

export default Featured;