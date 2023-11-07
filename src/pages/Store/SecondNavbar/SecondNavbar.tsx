import React, { FC, useState, useEffect } from "react";
import DesktopSecondNav from "./Desktop/DesktopSecondNav";
import MobileSecondNav from "./Mobile/MobileSecondNav";
import "./SecondNavbar.css";

const SecondNavbar: FC = () => {
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
      {isMobileView ? <MobileSecondNav /> : <DesktopSecondNav />}
    </div>
  );
};



export default SecondNavbar;
