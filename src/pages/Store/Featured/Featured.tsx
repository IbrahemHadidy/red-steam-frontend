import { FC, useState, useEffect } from "react";
import "./Featured.scss";
import FeaturedDesktop from "./Desktop/FeaturedDesktop";
import FeaturedMobile from "./Mobile/FeaturedMobile";


const Featured: FC = () => {
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